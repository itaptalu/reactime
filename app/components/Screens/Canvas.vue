<template>
    <canvas
        ref="canvasRef"
        class="w-full h-full relative z-0"
        @contextmenu.prevent="initConfigModal"
        @click="handleCanvasClick"
        @mousemove="handleMouseMove"
    >
        game
    </canvas>

    <Teleport to="body">
        <div
            v-if="configModal.show"
            ref="configModalRef"
            class="bg-white fixed z-10"
            :style="configModal.style"
        >
            asd
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const emits = defineEmits(['toggleScreen'])

const delay = useState('delay', () => 500 + Math.random() * 1000)
const radius = useState('radius', () => 12)
const reactionTime = useState('reactionTime', () => 0)
const mousePath = useState<{ x: number; y: number }[]>('mousePath', () => [])

let timer: ReturnType<typeof setTimeout>

const configModalRef = ref()
const canvasRef = ref()

const configModal = reactive({
    show: false,
    style: {},
})
const circle = reactive({
    x: 0,
    y: 0,
    appearedAt: 0,
})

const initConfigModal = (e: any) => {
    configModal.style = {
        left: `${e.clientX + 10}px`,
        top: `${e.clientY + 10}px`,
    }
    // configModal.show = true
}

const drawRandomCircle = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    mousePath.value = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const r = radius.value
    const topOffset = 188

    circle.x = r + Math.random() * (canvas.width - r * 2)
    circle.y = topOffset + r + Math.random() * (canvas.height - topOffset - r * 2)

    ctx.beginPath()
    ctx.arc(circle.x, circle.y, r, 0, Math.PI * 2)
    ctx.fillStyle = '#2DAA8C'
    ctx.fill()

    circle.appearedAt = performance.now()
}

const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mousePath.value.push({ x, y })

    const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2)

    canvas.style.cursor = distance <= radius.value ? 'pointer' : 'default'
}

const handleCanvasClick = (e: MouseEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2)

    if (distance <= radius.value) {
        handleCircleClick()
    }
}

const handleCircleClick = () => {
    reactionTime.value = performance.now() - circle.appearedAt
    emits('toggleScreen', 'result')
}

onClickOutside(configModalRef, () => {
    configModal.show = false
})

onMounted(() => {
    if (canvasRef.value) {
        timer = setTimeout(drawRandomCircle, delay.value)
    }
})

onUnmounted(() => {
    clearTimeout(timer)
})
</script>
