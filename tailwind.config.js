/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html'],
	theme: {
		extend: {
			fontFamily: ['Red Hat Mono', 'sans-serif'],
			colors: {
				projectRed: '#c73b0f',
				projectRose900: '#260f08',
				projectRose500: '#87635a',
				projectRose400: '#ad8a85',
				projectRose300: '#caafa7',
				projectRose100: '#f5eeec',
				projectRose50: '#fcf8f6',
				projectGreen: '#1ea575',
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [],
};
