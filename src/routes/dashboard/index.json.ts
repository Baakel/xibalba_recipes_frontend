import { api } from '$lib/_api';
import type { RequestHandler, EndpointOutput } from '@sveltejs/kit';
import type { Locals, MyHeaders } from '$lib/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: RequestHandler<Locals> = async (request) => {
	const response = await api(request, 'recipes/chosen');

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const del: RequestHandler<Locals> = async (request) => {
	return await api(request, 'recipes/weeklyreset');
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const post: RequestHandler<Locals> = async (request) => {
	const { ids } = JSON.parse(<string>request.body);
	const response = await api(request, 'recipes/weekly', { ids });

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
