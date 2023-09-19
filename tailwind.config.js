/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				'shadow-pulse': {
					'0%, 100%': { boxShadow: '0 0 10px #0000' },
					'50%': { boxShadow: '0 0 10px rgb(255,255,255)' }
				}
			},
			animation: {
				'shadow-pulse': 'shadow-pulse 2s infinite'
			}
		}
	},
	plugins: []
};
