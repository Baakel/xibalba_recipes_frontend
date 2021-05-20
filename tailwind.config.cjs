const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
// const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'aot',
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}'],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
					([_match, group, ..._rest]) => group
				)
			]
		},
		safelist: [/^svelte-[\d\w]+$/]
	},
	theme: {
		extend: {
			colors: {
				primary: '#dd5828',
				secondary: '#594e77',
				letters: {
					100: '#e1dac7',
					200: '#a49375',
				},
				fondo: {
					100: '#34342d',
					200: '#24241f',
				},
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};