import { api } from '$lib/_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals, Recipe } from '$lib/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const post: RequestHandler<Locals> = async (request) => {
	const recipe: Recipe = JSON.parse(<string>request.body);
	if (recipe.steps == ['']) {
		recipe.steps = undefined;
	}
	if (recipe.ingredients == [{ name: '', amount: '' }]) {
		recipe.ingredients = undefined;
	}
	const response = await api(request, 'recipes/new', {
		// name: recipe.name,
		// public: recipe.public,
		// steps: recipe.steps,
		// ingredients: recipe.ingredients,
		// calories: recipe.calories,
		// carbohydrates: recipe.carbohydrates,
		// fat: recipe.fat,
		// protein: recipe.protein,
		// servings: recipe.servings,
		// tipo: recipe.tipo,
		// mealType: recipe.mealType,
		// time: recipe.time
		...recipe
	});

	if (response.status === 404) {
		return { body: [] };
	}

	return response;
};
