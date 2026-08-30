<template>
    <div class="h-screen bg-black flex flex-col text-white" @contextmenu.prevent>
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
* {
    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Open Sans',
        'Helvetica Neue',
        sans-serif;
}
</style>
