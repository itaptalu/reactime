<template>
    <div class="h-screen bg-black flex flex-col text-white relative bg-wp" @contextmenu.prevent>
        <NuxtHeader />

        <main class="flex-1 flex justify-center items-center">
            <ScreensStart v-if="currentScreen === 'start'" @toggle-screen="toggleScreen" />
            <ScreensCanvas v-else-if="currentScreen === 'game'" @toggle-screen="toggleScreen" />
            <ScreensResult v-else-if="currentScreen === 'result'" @toggle-screen="toggleScreen" />
            <ScreensMousePath v-else />
        </main>

        <div ref="cursorRef" class="custom-cursor" />

        <div v-if="!isLocked" class="lock-overlay" @click="lock">Кликни, чтобы включить курсор</div>
    </div>
</template>

<script setup lang="ts">
const currentScreen = useState<Screens>('currentScreen', () => 'start')
const sensitivity = useState('sensitivity', () => 0.5)

const cursorRef = ref<HTMLElement>()
const isLocked = ref(false)

const pos = reactive({
    x: 0,
    y: 0,
})

const toggleScreen = (value: Screens) => {
    currentScreen.value = value
}

const applyPosition = () => {
    if (!cursorRef.value) return
    cursorRef.value.style.transform = `translate(${pos.x}px, ${pos.y}px)`
}

const handleMove = (e: MouseEvent) => {
    if (!isLocked.value) return

    pos.x = Math.min(Math.max(pos.x + e.movementX * sensitivity.value, 0), window.innerWidth)
    pos.y = Math.min(Math.max(pos.y + e.movementY * sensitivity.value, 0), window.innerHeight)

    applyPosition()
}

const handleClick = () => {
    if (!isLocked.value) return
    const el = document.elementFromPoint(pos.x, pos.y) as HTMLElement | null
    el?.click() // руками триггерим клик, т.к. настоящий mouseup/down браузера сюда не долетает
}

const lock = () => {
    document.body.requestPointerLock()
}

const handleLockChange = () => {
    isLocked.value = document.pointerLockElement === document.body
}

onMounted(() => {
    pos.x = window.innerWidth / 2
    pos.y = window.innerHeight / 2

    document.body.style.cursor = 'none'
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('click', handleClick)
    document.addEventListener('pointerlockchange', handleLockChange)
    applyPosition()
})

onUnmounted(() => {
    document.body.style.cursor = 'auto'
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('click', handleClick)
    document.removeEventListener('pointerlockchange', handleLockChange)
    if (document.pointerLockElement) document.exitPointerLock()
})
</script>

<style>
.custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition:
        width 0.15s,
        height 0.15s;
}

.lock-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    cursor: pointer;
}
</style>
