import { api } from '$lib/_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// interface NewUser {
// 	username: string;
// 	password: string;
// 	email: string;
// }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const post: RequestHandler<Locals> = async (request) => {
	const { username, password, email } = JSON.parse(<string>request.body);
	const response = await api(request, 'users/new', {
		username,
		password,
		email
	});

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
