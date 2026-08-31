<template>
    <canvas ref="canvasRef" class="w-full h-full relative z-0" @click="handleCanvasClick">
        game
    </canvas>
</template>

<script setup lang="ts">
const emits = defineEmits(['toggleScreen'])

const delay = useState('delay', () => 500 + Math.random() * 1000)
const radius = useState<number>('radius')
const best = useState<number>('best')
const reactionTime = useState('reactionTime', () => 0)
const mousePath = useState<{ x: number; y: number }[]>('mousePath', () => [])
const sensitivity = useState('sensitivity', () => 0.5)

let timer: ReturnType<typeof setTimeout>

const canvasRef = ref()

const circle = reactive({
    x: 0,
    y: 0,
    appearedAt: 0,
    visible: false,
})

const cursor = reactive({
    x: 0,
    y: 0,
})

const isLocked = () => document.pointerLockElement === canvasRef.value

const draw = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (circle.visible) {
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, radius.value, 0, Math.PI * 2)
        ctx.fillStyle = '#2DAA8C'
        ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(cursor.x, cursor.y, 6, 0, Math.PI * 3)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000000'
    ctx.stroke()
}

const drawRandomCircle = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    mousePath.value = []

    const r = radius.value
    const topOffset = 188

    circle.x = r + Math.random() * (canvas.width - r * 2)
    circle.y = topOffset + r + Math.random() * (canvas.height - topOffset - r * 2)
    circle.visible = true
    circle.appearedAt = performance.now()

    draw()
}

const handlePointerLockMove = (e: MouseEvent) => {
    if (!isLocked()) return
    const canvas = canvasRef.value
    if (!canvas) return

    cursor.x = Math.min(Math.max(cursor.x + e.movementX * sensitivity.value, 0), canvas.width)
    cursor.y = Math.min(Math.max(cursor.y + e.movementY * sensitivity.value, 0), canvas.height)

    mousePath.value.push({ x: cursor.x, y: cursor.y })

    const distance = Math.sqrt((cursor.x - circle.x) ** 2 + (cursor.y - circle.y) ** 2)
    canvas.style.cursor = distance <= radius.value ? 'pointer' : 'none'

    draw()
}

const handleCanvasClick = () => {
    const canvas = canvasRef.value
    if (!canvas) return

    if (!isLocked()) {
        canvas.requestPointerLock()
        return
    }

    const distance = Math.sqrt((cursor.x - circle.x) ** 2 + (cursor.y - circle.y) ** 2)

    if (distance <= radius.value) {
        handleCircleClick()
    }
}

const handleCircleClick = () => {
    reactionTime.value = Math.floor(Number(performance.now() - circle.appearedAt))
    circle.visible = false

    updateBest()
    emits('toggleScreen', 'result')
}

const updateBest = () => {
    if (best.value === 0) {
        best.value = reactionTime.value
    } else if (reactionTime.value < best.value) {
        best.value = reactionTime.value
    }

    localStorage.setItem('best', best.value.toString())
}

const handleLockChange = () => {
    if (!isLocked() && canvasRef.value) {
        canvasRef.value.style.cursor = 'default'
    }
}

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.requestPointerLock()
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cursor.x = canvas.width / 2
    cursor.y = canvas.height / 2

    document.addEventListener('mousemove', handlePointerLockMove)
    document.addEventListener('pointerlockchange', handleLockChange)

    timer = setTimeout(drawRandomCircle, delay.value)
})

onUnmounted(() => {
    clearTimeout(timer)
    document.removeEventListener('mousemove', handlePointerLockMove)
    document.removeEventListener('pointerlockchange', handleLockChange)
    if (isLocked()) document.exitPointerLock()
})
</script>
