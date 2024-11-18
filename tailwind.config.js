/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            scrollbar: {
                hide: 'no-scrollbar',
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.no-scrollbar': {
                    /* Firefox */
                    'scrollbar-width': 'none',
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',
                    /* Webkit */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            });
        },
    ],
};
