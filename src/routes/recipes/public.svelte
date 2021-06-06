<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		// if (!session.username) {
		// 	return {
		// 		redirect: '/login',
		// 		status: 302
		// 	};
		// }
		const res = await fetch('/recipes/public.json');
		// console.log(res)

		if (res.ok) {
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
	export let recipes;
</script>

<h1 class='text-center text-6xl font-bold'>Our public recipes</h1>

<div class="">
	<div class="mt-8 grid grid-cols-wrap-auto gap-3">
		<!--		Cards go here -->
		{#each recipes as recipe (recipe.id)}
			<div class="card hover:shadow-lg">
				<img
					class="w-full h-32 sm:h-48 object-cover"
					src={recipe.mealType ? `/${recipe.mealType}-s.jpg` : '/salad.jpg'}
					alt={recipe.mealType}
				/>
				<div class="m-4 overflow-auto">
					<a sveltekit:prefetch href={`./public-${recipe.id}`}>
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

<style>
    div {
        @apply text-center;
    }
    .card {
        @apply bg-fondo-200 rounded overflow-hidden shadow-md mb-3 relative;
    }
</style>