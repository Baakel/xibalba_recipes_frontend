// Leaving this here, probably will delete file since I think this is no longer
// needed if you pulling from a static site

import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

const base = 'http://localhost:8000/api'

export async function api(request: Request<Locals>, resource: string, data?: {}) {
	// User must have cookie set
	// if (!request.context.user_id) {
	// 	return { status: 401}
	// }
	// if (!request.locals.user_id) {
	// 	console.log("API didnt find user")
	// } else {
	// 	console.log("API DID find user")
	// }

	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
			'cookie': `user_id=${request.locals.user_id}`
		},
		body: data && JSON.stringify(data),
		mode: 'cors',
		credentials: 'include'
	});

	return {
		status: res.status,
		body: await res.json()
	};
}