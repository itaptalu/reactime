<template>
    <div class="flex flex-col gap-8 w-full max-w-60">
        <h1 class="text-8/none font-medium text-center">
            {{ Math.floor(Number(reactionTime)).toLocaleString() }} ms
        </h1>
        <div class="flex flex-col gap-2">
            <button
                class="px-8 py-2 rounded-xl bg-primary uppercase font-bold text-black hover:opacity-90 hover:text-black-800 duration-300 disabled:opacity-40"
                @click="$emit('toggleScreen', 'game')"
            >
                replay
            </button>
            <button
                class="px-8 py-2 rounded-xl bg-black-500 uppercase font-bold text-black hover:opacity-90 hover:text-black-800 duration-300 disabled:opacity-40"
                @click="$emit('toggleScreen', 'mouse')"
            >
                Show mouse path
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['toggleScreen'])
const reactionTime = useState('reactionTime')
</script>
