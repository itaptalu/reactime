/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/*.vue',
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2DAA8C',
                white: '#FFFFF0',
                pink: '#CCBAB8',
                black: {
                    DEFAULT: '#1D1D1D',
                    900: '#262626',
                    800: '#30302E',
                    700: '#3B3B3B',
                    600: '#5D5D5D',
                    500: '#8D8D8D',
                },
            },
            spacing: {},
            maxWidth: ({ theme }) => ({
                ...theme('spacing'),
            }),
            minWidth: ({ theme }) => ({
                ...theme('spacing'),
            }),
            maxHeight: ({ theme }) => ({
                ...theme('spacing'),
            }),
            minHeight: ({ theme }) => ({
                ...theme('spacing'),
            }),
            borderRadius: ({ theme }) => ({
                ...theme('spacing'),
            }),
            fontSize: ({ theme }) => ({
                ...theme('spacing'),
            }),
            lineHeight: ({ theme }) => ({
                ...theme('spacing'),
            }),
        },
    },
}
