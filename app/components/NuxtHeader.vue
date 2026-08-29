<template>
    <header
        class="flex justify-between items-center px-[calc(14%)] py-2 bg-black border-b-2 border-black-700 absolute z-10 inset-x-0"
    >
        <button
            class="size-6"
            :disabled="currentScreen !== 'mouse'"
            @click="currentScreen = 'result'"
        >
            <Icon v-if="currentScreen === 'mouse'" name="material-symbols:arrow-back-rounded" />
        </button>
        <NuxtLink to="/">
            <Icon name="icon:logo" size="40" />
        </NuxtLink>
        <button class="size-6" :disabled="currentScreen !== 'mouse'" @click="share">
            <Icon v-if="currentScreen === 'mouse'" name="material-symbols:share-outline" />
        </button>
    </header>
</template>

<script setup lang="ts">
const currentScreen = useState<Screens>('currentScreen', () => 'start')

const share = () => {
    console.log('share')
}
</script>
