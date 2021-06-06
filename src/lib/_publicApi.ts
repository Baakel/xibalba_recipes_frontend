import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

const base = 'http://localhost:8000/api';

export async function publicApi(request: Request<Locals>, resource: string, data?: {}) {
	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
			cookie: `user_id=${request.locals.user_id}`
		},
		body: data && JSON.stringify(data),
		mode: 'cors',
		credentials: 'include'
	});

	if (res.ok && request.method !== 'GET' && request.headers.accept !== 'application/json') {
		return {
			status: res.status,
			body: []
		};
	}
	if (!res.ok) {
		return {
			status: res.status,
			body: res.statusText
		};
	}
	return {
		status: res.status,
		body: await res.json()
	};
}
