<template>
    <UApp>
        <NuxtPage />
    </UApp>
</template>

<script setup lang="ts">
const radius = useState('radius', () => 12)

onBeforeMount(() => {
    if (localStorage.getItem('radius')) {
        radius.value = Number(localStorage.getItem('radius'))
    }
})
</script>
