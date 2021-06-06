<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// import { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const res = await fetch(`/recipes/public-${page.params.uuid}.json`);

		if (res.status === 401) {
			return {
				redirect: '/recipes/public',
				status: 302
			};
		}

		if (res.ok) {
			const recipe = await res.json();

			return {
				props: { recipe }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script>
	export let recipe;
</script>

<div class="md:mx-auto block bg-fondo-200 mt-8 md:mt-0 p-12 rounded-lg lg:w-2/3 capitalize">
	<h2 class="text-center font-bold text-4xl">{recipe.name}</h2>

	<h4 class="text-lg font-bold text-center my-8">Ingredients</h4>
	{#each recipe.ingredients as ingredient}
		<div
			class="flex flex-wrap justify-between overflow-auto ingredients-container bg-fondo-100 rounded-lg mx-auto my-2 p-4 hover:bg-secondary capitalize w-full lg:w-3/5"
		>
			<p>{ingredient.name}</p>
			<p class="amount">{ingredient.amount}</p>
		</div>
	{/each}

	<h4 class="text-2xl font-bold text-center my-8">Steps</h4>
	<div class="mx-auto w-11/12 md:w-5/6">
		{#each recipe.steps as step}
			<p class="text-left my-4 font-semibold text-lg">{step}</p>
		{/each}
	</div>
</div>

<style>
</style>
