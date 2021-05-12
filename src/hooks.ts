import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({request, render}) => {
	const cookies = cookie.parse(request.headers.cookie || '')
	request.locals.user_id = cookies.user_id || ''; // Passing the info to the server

	const response = await render(request);

	// if (!cookies.user_id)  {
	// 	console.log("This has no uuid")
	// } else {
	// 	console.log("Cookie found")
	// }

	return response;
}