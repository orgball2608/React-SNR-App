/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1E90FF',
                'simple-gray': '#131313',
                'dark-light': '#1a1a1a',
                'label-white': '#8f8f8f',
                'blue-button': '#2b09ff',
                'dark-header': '#151515',
                'border-conversations': '#5454543d',
                'modal-background': '#121212',
                'overlay-background': '#000000c4',
                'conversation-form': '#161616',
                'message-form': '#101010',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                Inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
