/* Used in case we want server side rendering. But I think we figured out this CORS shit */

// import adapter from '@sveltejs/adapter-static';
//
// export default {
// 	kit: {
// 		adapter: adapter({
// 			// default options are shown
// 			pages: 'build',
// 			assets: 'build',
// 			fallback: null
// 		})
// 	}
// };

import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess(),

	kit: {
		target: '#svelte'
	}
};

export default config;
