import { api } from '$lib/_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

interface Creds {
	username: string;
	password: string;
}

// Specifically supressing this error until typescript 4.3 where you can differentiate in the EndpointOutput the
// Headers type from Record<string, string | string[]>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const post: RequestHandler<Locals> = async (request) => {
	const creds: Creds = JSON.parse(<string>request.body);
	const response = await api(request, 'login', {
		username: creds.username,
		password: creds.password
	});

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
