<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, session }) => {
		if (!session.username) {
			return {
				redirect: '/login',
				status: 302
			};
		}
		const res = await fetch('/dashboard.json');
		
		if (res.ok) {
			// We switched from the above form, which looks like rust code kinda. To a more javascript
			// way of dealing with it. Destructuring the object immediately
			// const recipesVec = await res.json();
			const { recipes } = await res.json();

			return {
				props: { recipes }
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
	let amount: number;
	let error: string;
	let shoppingList;
	let groupedIngredients = [];

	$: {
		shoppingList = recipes.map((recipe) => recipe.ingredients).flat();
		groupedIngredients = shoppingList.reduce((reducer, ingredient) => {
			reducer[ingredient.name] = reducer[ingredient.name] || [];
			reducer[ingredient.name].push({ amount: ingredient.amount });
			return reducer;
		}, Object.create(null));
	}

	// async function handleDel() {
	// 	// const recipez = await fetch('/dashboard.json', {
	// 	// 	method: 'DELETE'
	// 	// })
	// 	const res = await fetch(`/dashboard/weekly-${amount}.json`);
	// 	console.log(res, await res.json())
	// }

	async function deleteChosenRecipes(): Promise<boolean> {
		error = undefined;
		try {
			const res = await fetch('/dashboard.json', {
				method: 'DELETE'
			});

			if (res.ok) {
				return true;
			}
			error = "Couldn't delete the chosen recipes";
			return false;
		} catch (err) {
			error = 'Server unavailable for deleting the chosen recipes';
			return false;
		}
	}

	async function chooseWeeklyRecipes(ids: [string]): Promise<boolean> {
		error = undefined;
		try {
			const res = await fetch('/dashboard.json', {
				method: 'POST',
				body: JSON.stringify({ ids })
				// headers: { 'Content-Type': 'application/json' },
				// mode: 'cors',
				// credentials: 'include'
			});

			if (res.ok) {
				return true;
			}
			error = "Couldn't choose new recipes";
			return false;
		} catch (err) {
			console.log(err);
			error = 'Server unavailable while choosing new random recipes';
			return false;
		}
	}

	async function getRandomRecipes() {
		error = undefined;
		try {
			const res = await fetch(`/dashboard/weekly-${amount}.json`);

			if (res.ok) {
				let { recipes: newRecipes } = await res.json();
				let recipeIds = newRecipes.map((recipe) => recipe.id);
				let chooseWeeklyTest = false;
				let deleteResTest = await deleteChosenRecipes();
				if (deleteResTest) {
					chooseWeeklyTest = await chooseWeeklyRecipes(recipeIds);
				}
				if (deleteResTest && chooseWeeklyTest) {
					return newRecipes;
				}
			}
			error = 'Error fetching response';
			return false;
		} catch (err) {
			error = 'Server unavailable for getting new random recipes';
			return false;
		}
	}
	const handleNewRecipes = async () => {
		let success = await getRandomRecipes();
		if (success) {
			// cols = recipes.length;
			recipes = success;
			amount = null;
		}
	};
</script>

<header>
	<h2 class="text-5xl text-center font-bold pb-12">{$session.username}'s Weekly Recipes</h2>
</header>

<div>
	<div class="grid grid-cols-3 gap-6 pb-2 border-b border-letters-200">
		{#if error}
			<span class="text-center text-primary text-xs tracking-wide">{error}</span>
		{/if}
		<div>
			<a sveltekit:prefetch class="std-btn" href="/recipes/create">Add a new recipe</a>
		</div>
		<h4 class="text-3xl col-start-2 col-end-3 text-center font-bold text-primary ">
			Chosen Recipes
		</h4>
		<div class="col-start-3">
			<form
				class="inline-block md:flex md:items-center md:justify-center"
				action="#"
				on:submit|preventDefault={handleNewRecipes}
			>
				<button type="submit" class="btn text-letters-100 bg-secondary text-xs rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 inline-block mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					New recipes
				</button>
				<input
					type="number"
					max="14"
					min="1"
					class="bg-fondo-100 text-letters-100 border-secondary border-2 focus:border-letters-200 rounded-lg w-8 text-center mx-2 my-2 md:my-0 focus:outline-none"
					bind:value={amount}
					required
					aria-required="true"
				/>
			</form>
		</div>
	</div>
	<!--	<div class="mt-8 grid lg:grid-cols-{cols} gap-3">-->
	<div class="mt-8 grid md:grid-cols-wrap-auto gap-3">
		<!--		Cards go here -->
		{#each recipes as recipe (recipe.id)}
			<div class="card hover:shadow-lg">
				<img
					class="w-full h-32 sm:h-48 object-cover"
					src={recipe.mealType ? `/${recipe.mealType}-s.jpg`: "/salad.jpg" }
					alt={recipe.mealType}
				/>
				<div class="m-4 overflow-auto">
					<a sveltekit:prefetch href={`recipes/${recipe.id}`}>
						<span class="font-bold text-letters-200 capitalize">{recipe.name}</span>
					</a>
					{#each recipe.ingredients as ingredient}
						<div
							class="flex flex-wrap justify-between gap-3 lg:gap-4 px-3 lg:px-4 xl:px-6 py-0.5 my-3 bg-fondo-100 rounded-lg hover:bg-secondary overflow-auto"
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

	<h4 class="font-bold pb-2 text-xl text-primary border-b border-letters-200 mt-8">
		Weekly Shopping List
	</h4>
	<div class="mt-8" />
	<!--	<div class="mt-8">-->
	<!--		&lt;!&ndash; All your recipes plus your liked ones should go here &ndash;&gt;-->
	<!--	</div>-->

	<!--	<div class="mt-12 flex justify-center">-->
	<!--		<div class="btn bg-secondary text-letters-100">Load more?</div>-->
	<!--	</div>-->
</div>

<div class="md:mx-auto flex justify-center bg-fondo-200 p-4 rounded-lg md:w-2/3">
	<ul class="w-4/5">
		{#each Object.entries(groupedIngredients) as [ingredient, amounts]}
			<li
				class="bg-fondo-100 text-sm my-2 p-2 text-letters-100 capitalize font-semibold hover:bg-secondary rounded-lg"
			>
				<!--				<div class="grid gap-4 grid-cols-2">-->
				<div class="flex gap-4 justify-between">
					<div class=""><span class="block text-left">{ingredient}</span></div>
					<div class="">
						{#each amounts as amount}
							<span class="block text-right">{amount.amount}</span>
						{/each}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		padding: 0;
	}
	li {
		list-style-type: none;
	}
	li a {
		display: block;
		padding: 15px;
		border: 1px solid #872ad2;
		border-radius: 8px;
		margin: 10px auto;
		text-decoration: none;
	}
	li a:hover {
		background: #fbfbfb;
	}
	div {
		@apply text-center;
	}
	.card {
		@apply bg-fondo-200 rounded overflow-hidden shadow-md mb-3 relative;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
