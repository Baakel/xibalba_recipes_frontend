<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// import { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const res = await fetch(`/recipes/${page.params.uuid}.json`);

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

<h2>{recipe.name}</h2>

<h4>Ingredients</h4>
{#each recipe.ingredients as ingredient}
	<div class="ingredients-container">
		<p>{ingredient.name}</p>
		<p class="amount">{ingredient.amount}</p>
	</div>
{/each}

<h4>Steps</h4>
{#each recipe.steps as step}
	<p>{step}</p>
{/each}

<style>
	.ingredients-container {
		display: flex;
		align-items: center;
	}

	.amount {
		padding-left: 2em;
	}
</style>
