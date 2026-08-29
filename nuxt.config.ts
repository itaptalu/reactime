// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    ssr: false,

    modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@vueuse/nuxt'],

    icon: {
        size: '24px',
        provider: 'server',
        customCollections: [
            {
                prefix: 'icon',
                dir: './app/assets/icons',
            },
        ],
    },
})