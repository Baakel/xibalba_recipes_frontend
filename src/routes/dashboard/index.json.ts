import { api } from '$lib/_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

export const get: RequestHandler<Locals> = async (request) => {
	const response = await api(request, 'recipes/chosen')

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
}