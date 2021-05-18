import { api } from '$lib/_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

export const get: RequestHandler<Locals> = async (request) => {
	const response = await api(request, `recipes/${request.params.uuid}`);

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
