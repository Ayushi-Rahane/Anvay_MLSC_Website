/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1a1a2e',
                secondary: '#16213e',
                accent: '#0f3460',
                highlight: '#e94560',
                gold: '#ffd700',
                silver: '#c0c0c0',
                bronze: '#cd7f32',
                platinum: '#e5e4e2',
            },
            fontFamily: {
                heading: ['Orbitron', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
