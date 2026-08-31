<template>
    <div class="h-screen bg-black flex flex-col text-white relative bg-wp" @contextmenu.prevent>
        <NuxtHeader />

        <main class="flex-1 flex justify-center items-center">
            <ScreensStart v-if="currentScreen === 'start'" @toggle-screen="toggleScreen" />
            <ScreensCanvas v-else-if="currentScreen === 'game'" @toggle-screen="toggleScreen" />
            <ScreensResult v-else-if="currentScreen === 'result'" @toggle-screen="toggleScreen" />
            <ScreensMousePath v-else />
        </main>
    </div>
</template>

<script setup lang="ts">
const currentScreen = useState<Screens>('currentScreen', () => 'start')

const toggleScreen = (value: Screens) => {
    currentScreen.value = value
}
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
    transform: translate(-50%, -50%);
    transition:
        width 0.15s,
        height 0.15s;
}
</style>
