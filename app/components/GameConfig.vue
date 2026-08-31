<template>
    <div
        ref="configRef"
        class="bg-black-900 w-full p-4 rounded-xl border-2 border-black-700"
        :class="{ 'opacity-0': screen === 'start' }"
    >
        <div class="flex flex-col gap-4">
            <span class="leading-none">Target radius</span>
            <USlider
                v-if="loaded"
                v-model="value"
                :min="2"
                :max="24"
                :step="1"
                tooltip
                @change="updateRadius"
            />
            <span v-else class="h-2 shimmer rounded-xl" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ screen?: 'start' | 'finish' }>(), { screen: 'start' })

const radius = useState<number>('radius')

const value = ref(radius.value)

const configRef = ref<HTMLDivElement | null>(null)
const loaded = ref(props.screen !== 'start')

const updateRadius = () => {
    if (typeof value.value === 'object') {
        radius.value = value.value[0]
    } else {
        radius.value = value.value
    }

    localStorage.setItem('radius', radius.value.toString())
}

onMounted(() => {
    if (configRef.value && props.screen === 'start') {
        useAnime(configRef.value, {
            opacity: [0, 1],
            translateX: [100, 0],
            duration: 2000,
            delay: 1000,
            onComplete: () => {
                loaded.value = true
            },
        })
    }
})
</script>
