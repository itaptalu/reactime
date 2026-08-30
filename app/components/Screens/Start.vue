<template>
    <div class="grid grid-cols-2 gap-8 items-center">
        <div ref="startScreenRef" class="flex flex-col gap-8 w-80 opacity-0">
            <h1 class="text-3xl/none font-medium text-center">Check your reaction</h1>
            <button
                class="px-8 py-2 rounded-xl bg-primary uppercase font-bold text-black hover:opacity-90 hover:text-black-800 duration-300 disabled:opacity-40"
                :disabled="disabled"
                @click="startPlaying()"
            >
                Start
            </button>
        </div>
        <GameConfig />
    </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['toggleScreen'])

const startScreenRef = ref<HTMLDivElement | null>(null)

const disabled = ref(true)

function startPlaying() {
    emits('toggleScreen', 'game')
}

onMounted(() => {
    if (startScreenRef.value) {
        useAnime(startScreenRef.value, {
            opacity: [0, 1],
            translateY: [100, 0],
            duration: 2000,
            delay: 1000,
            onComplete: () => {
                disabled.value = false
            },
        })
    }
})
</script>
