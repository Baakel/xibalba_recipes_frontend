import { api } from '$lib/_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: RequestHandler<Locals> = async (request) => {
	const response = await api(request, 'recipes/list');

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
