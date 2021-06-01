<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, session }) => {
		if (!session.username) {
			return {
				redirect: '/login',
				status: 302
			};
		}

		const res = await fetch('/recipes.json');
		if (res.status === 404) {
			return {
				body: []
			};
		}
		if (res.ok) {
			const { recipes, rels } = await res.json();
			const ownedRecipes = recipes.filter((recipe) => {
				return rels.owns.includes(recipe.id);
			});
			const likedRecipes = recipes.filter((recipe) => {
				return rels.likes.includes(recipe.id);
			});
			const publicRecipes = recipes.filter((recipe) => {
				return !ownedRecipes.includes(recipe) && !likedRecipes.includes(recipe);
			});
			// const publicRecipes = recipes.filter((recipe) => {
			// 	return !rels.owns.includes(recipe.id) &&
			// })

			return {
				props: { recipes, publicRecipes, likedRecipes, ownedRecipes }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	export let recipes;
	export let ownedRecipes;
	export let likedRecipes;
	export let publicRecipes;
	let error;
	// console.log(recipes, rels)

	const handleLike = async (id) => {
		error = undefined;
		let index = null;
		try {
			const res = await fetch('recipes/like.json', {
				method: 'PUT',
				body: JSON.stringify({ id })
			});
			if (res.status === 201) {
				index = publicRecipes.findIndex((recipe) => recipe.id === id);
				const removedRecipe = publicRecipes[index];
				publicRecipes.splice(index, 1);
				publicRecipes = [...publicRecipes]
				likedRecipes = [...likedRecipes, removedRecipe];
			}
			if (res.status === 202) {
				index = likedRecipes.findIndex((recipe) => recipe.id === id);
				const removedRecipe = likedRecipes[index];
				likedRecipes.splice(index, 1);
				likedRecipes = [...likedRecipes]
				publicRecipes = [...publicRecipes, removedRecipe];
			}
		} catch (err) {
			console.log(err);
			error = 'Server unavailable for liking';
		}
	};
</script>

<h1 class="text-center text-6xl font-bold">{$session.username}'s recipes</h1>

<div class="">
	<div class="mt-8 grid grid-cols-wrap-auto gap-3">
		<!--		Cards go here -->
		{#each ownedRecipes as recipe (recipe.id)}
			<div class="card hover:shadow-lg">
				<img
					class="w-full h-32 sm:h-48 object-cover"
					src={recipe.mealType ? `/${recipe.mealType}-s.jpg` : '/salad.jpg'}
					alt={recipe.mealType}
				/>
				<div class="m-4 overflow-auto">
					<a sveltekit:prefetch href={`recipes/${recipe.id}`}>
						<span class="font-bold text-letters-200 capitalize">{recipe.name}</span>
					</a>
					{#each recipe.ingredients as ingredient}
						<div
							class="flex flex-wrap justify-between gap-3 lg:gap-4 px-3 lg:px-4 xl:px-6 py-0.5 my-3 bg-fondo-100 rounded-lg hover:bg-secondary overflow-auto font-semibold text-xs"
						>
							<p class="text-left capitalize">
								<span>{ingredient.name}</span>
							</p>
							<p class="text-left capitalize">
								<span>{ingredient.amount}</span>
							</p>
						</div>
					{/each}
				</div>
				<div class="badge">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 inline-block"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>{recipe.time}</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<h2 class="text-center text-4xl font-bold pb-2 border-b border-letters-200 mt-8">Liked Recipes</h2>

<div class="">
	<div class="mt-8 grid grid-cols-wrap-auto gap-3">
		<!--		Cards go here -->
		{#each likedRecipes as recipe (recipe.id)}
			<div class="card hover:shadow-lg">
				<img
					class="w-full h-32 sm:h-48 object-cover"
					src={recipe.mealType ? `/${recipe.mealType}-s.jpg` : '/salad.jpg'}
					alt={recipe.mealType}
				/>
				<div class="m-4 overflow-auto">
					<a sveltekit:prefetch href={`recipes/${recipe.id}`}>
						<span class="font-bold text-letters-200 capitalize">{recipe.name}</span>
					</a>
					{#each recipe.ingredients as ingredient}
						<div
							class="flex flex-wrap justify-between gap-3 lg:gap-4 px-3 lg:px-4 xl:px-6 py-0.5 my-3 bg-fondo-100 rounded-lg hover:bg-secondary overflow-auto font-semibold text-xs"
						>
							<p class="text-left capitalize">
								<span>{ingredient.name}</span>
							</p>
							<p class="text-left capitalize">
								<span>{ingredient.amount}</span>
							</p>
						</div>
					{/each}
				</div>
				<div class="badge">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 inline-block"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>{recipe.time}</span>
				</div>
				<div
					class="likes right-0 top-20 sm:top-36"
					on:click={() => {
						handleLike(recipe.id);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 inline-block"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			</div>
		{/each}
	</div>
</div>

<h2 class="text-center text-3xl font-bold pb-2 border-b border-letters-200 mt-8">Public recipes</h2>
<div class="">
	<div class="mt-8 grid grid-cols-wrap-auto gap-3">
		<!--		Cards go here -->
		{#each publicRecipes as recipe (recipe.id)}
			<div class="card hover:shadow-lg">
				<img
					class="w-full h-32 sm:h-48 object-cover"
					src={recipe.mealType ? `/${recipe.mealType}-s.jpg` : '/salad.jpg'}
					alt={recipe.mealType}
				/>
				<div class="m-4 overflow-auto">
					<a sveltekit:prefetch href={`recipes/${recipe.id}`}>
						<span class="font-bold text-letters-200 capitalize">{recipe.name}</span>
					</a>
					{#each recipe.ingredients as ingredient}
						<div
							class="flex flex-wrap justify-between gap-3 lg:gap-4 px-3 lg:px-4 xl:px-6 py-0.5 my-3 bg-fondo-100 rounded-lg hover:bg-secondary overflow-auto font-semibold text-xs"
						>
							<p class="text-left capitalize">
								<span>{ingredient.name}</span>
							</p>
							<p class="text-left capitalize">
								<span>{ingredient.amount}</span>
							</p>
						</div>
					{/each}
				</div>
				<div class="badge">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 inline-block"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>{recipe.time}</span>
				</div>
				<div
					class="likes right-0 top-20 sm:top-36"
					on:click={() => {
						handleLike(recipe.id);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 inline-block"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	div {
		@apply text-center;
	}
	.card {
		@apply bg-fondo-200 rounded overflow-hidden shadow-md mb-3 relative;
	}
	.likes {
		@apply bg-secondary text-letters-100 text-xs uppercase font-bold rounded-full p-2 absolute mr-2
			mt-2 cursor-pointer;
	}
</style>
