<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, session }) => {
		if (!session.username) {
			return {
				error: new Error('You need to login first.'),
				status: 401
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
	let cols = 7;
</script>

<header>
	<h2 class="text-5xl text-center font-bold pb-12">{$session.username}'s Weekly Recipes</h2>
</header>

<div>
	<h4 class="text-3xl text-center font-bold text-primary pb-2 border-b border-letters-200">
		Chosen Recipes
	</h4>
	<div class="mt-8 grid lg:grid-cols-{cols} gap-3">
		<!--		Cards go here -->
		{#each recipes as recipe}
			<div class="card hover:shadow-lg">
				<img class="w-full h-32 sm:h-48 object-cover" src="salad.jpg" alt={recipe.mealType} />
				<div class="m-4">
					<a sveltekit:prefetch href={`recipes/${recipe.id}`}>
						<span class="font-bold text-letters-200">{recipe.name}</span>
					</a>
					{#each recipe.steps as step}
						<p class="text-justify">
							<span>{step}</span>
						</p>
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

	<h4 class="font-bold pb-2 text-xl text-primary border-b border-letters-200">Your recipes</h4>
	<div class="mt-8">
		<!-- All your recipes plus your liked ones should go here -->
	</div>

	<div class="mt-12 flex justify-center">
		<div class="btn bg-secondary text-letters-100">Load more?</div>
	</div>
</div>

<ul>
	{#each recipes as recipe}
		<li class="text-center"><a href={`recipes/${recipe.id}`}>{recipe.name}</a></li>
	{/each}
</ul>

<div>
	<a class="std-btn" href="/recipes/create">Add a new recipe</a>
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
		text-align: center;
	}
	.card {
		@apply bg-fondo-200 rounded overflow-hidden shadow-md mb-3 relative;
	}
</style>
