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
					200: '#a49375'
				},
				fondo: {
					100: '#34342d',
					200: '#24241f'
				}
			},
			backgroundImage: (theme) => ({
				// 'home-banner': "url('home_banner.jpg')",
				'home-banner-s': "url('/home_banner_s.jpg')",
				// 'baked-bread': "url('baked_bread.jpg')",
				'baked-bread-s': "url('/baked_bread_s.jpg')",
				// 'kitchen-recipes': "url('kitchen_recipes.jpg')",
				'kitchen-recipes-s': "url('/kitchen_recipes_s.jpg')"
			}),
			backgroundPosition: {
				'center-center': 'center center',
				'center-left': 'center left',
				'center-right': 'center right'
			},
			minHeight: {
				96: '24rem'
			},
			spacing: {
				225: '56.25rem',
				192: '48rem',
				'25p': '25%',
				'200p': '200%'
			},
			zIndex: {
				m1: '-10',
				100: '100'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
