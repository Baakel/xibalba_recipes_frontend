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
	recipe.name = recipe.name.toLowerCase();
	if (recipe.servings) {
		recipe.servings = recipe.servings.toLowerCase();
	}
	if (recipe.tipo) {
		recipe.tipo = recipe.tipo.toLowerCase();
	}
	if (recipe.mealType) {
		recipe.mealType = recipe.mealType.toLowerCase();
	}
	if (recipe.time) {
		recipe.time = recipe.time.toLowerCase();
	}
	if (recipe.ingredients) {
		recipe.ingredients = recipe.ingredients.map((ing) => {
			let lName;
			let lAmount;
			let lTipo;
			if (ing.name) {
				lName = ing.name.toLowerCase();
			}
			if (ing.amount) {
				lAmount = ing.amount.toLowerCase();
			}
			if (ing.tipo) {
				lTipo = ing.tipo.toLowerCase();
			}
			return {
				name: lName,
				amount: lAmount,
				tipo: lTipo
			};
		});
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
