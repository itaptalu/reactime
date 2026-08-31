<template>
    <UApp>
        <NuxtPage />
    </UApp>
</template>

<script setup lang="ts">
const radius = useState('radius', () => 12)
const best = useState('best', () => 0)

onBeforeMount(() => {
    if (localStorage.getItem('radius')) {
        radius.value = Number(localStorage.getItem('radius'))
    }
    if (localStorage.getItem('best')) {
        best.value = Number(localStorage.getItem('best'))
    }
})
</script>
