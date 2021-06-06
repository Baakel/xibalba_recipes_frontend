import { publicApi } from '$lib/_publicApi';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: RequestHandler<Locals> = async (request) => {
	const response = await publicApi(request, `recipes/public/${request.params.uuid}`);

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
