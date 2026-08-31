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
        <ClientOnly>
            <div class="flex-1 flex justify-center">
                <p v-if="best" class="text-black-500">
                    best result:
                    <span ref="bestRef" class="font-medium">
                        {{ displayedBest.toLocaleString() }}
                    </span>
                    ms
                </p>
            </div>
        </ClientOnly>
        <NuxtLink to="/">
            <Icon name="icon:logo" size="40" />
        </NuxtLink>
        <ClientOnly>
            <div class="flex-1 flex justify-center" />
        </ClientOnly>
        <!-- <button class="size-6" :disabled="currentScreen !== 'mouse'" @click="share">
            <Icon v-if="currentScreen === 'mouse'" name="material-symbols:share-outline" />
        </button> -->
        <span class="size-6" />
    </header>
</template>

<script setup lang="ts">
import { scrambleText } from 'animejs'

const currentScreen = useState<Screens>('currentScreen', () => 'start')

const best = useState<number>('best')

const displayedBest = ref()

const bestRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
    displayedBest.value = best.value

    watch(best, newVal => {
        useAnime(bestRef.value!, {
            innerHTML: scrambleText({
                text: newVal.toString(),
                chars: 'numbers',
                settleDuration: 1000,
            }),
            onComplete: () => {
                displayedBest.value = newVal
            },
        })
    })
})
</script>
