// Leaving this here, probably will delete file since I think this is no longer
// needed if you pulling from a static site

import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

const base = 'http://localhost:8000/api';
const allowedRoutes = ['/login.json', '/register.json'];

export async function api(request: Request<Locals>, resource: string, data?: {}) {
	// User must have cookie set
	// if (!request.context.user_id) {
	// 	return { status: 401}
	// }
	// if (!request.locals.user_id) {
	// 	console.log('API didnt find user');
	// } else {
	// 	console.log('API DID find user');
	// }
	if (!request.locals.user_id && !allowedRoutes.includes(request.path)) {
		return { status: 401, body: [] };
	}

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

	if (res.ok && (request.path === '/login.json' || request.path === '/register.json')) {
		const byteString = res.headers.get('set-cookie');
		const splitIndex = byteString.indexOf(' GMT,');
		const cookieString1 = byteString.slice(splitIndex + 5);
		const cookieString2 = byteString.slice(0, splitIndex + 4);
		return {
			status: res.status,
			headers: {
				'set-cookie': [cookieString1, cookieString2]
			}
		};
	}

	if (res.ok && request.path === '/logout.json') {
		return {
			status: res.status,
			headers: {
				'set-cookie': ['user_id=; Path=/; Max-Age=0;', 'username=; Path=/; Max-Age=0;']
			}
		};
	}

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
