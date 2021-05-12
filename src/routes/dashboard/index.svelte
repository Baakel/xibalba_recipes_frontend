<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/dashboard.json');

		if (res.ok) {
			const recipesVec = await res.json();
			const recipes = await recipesVec.recipes;


			return {
				props: { recipes }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	}
</script>

<script lang="ts">
	import Nav from '../../lib/Nav.svelte';
	export let recipes;
</script>

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
</style>

<header>
	<h2>Weekly Recipes</h2>
</header>

<div>
	<h4>Chosen Recipes</h4>
	<div>
<!--		Cards go here -->
		<div>
			<img src='' alt="Recipe">
			<div>
				<span>Title</span>
				<span>Content</span>
			</div>
		</div>
	</div>

	<h4>Your recipes</h4>
	<div>
<!-- All your recipes plus your liked ones should go here -->

	</div>

	<div>
		<div>Load more?</div>
	</div>
</div>

<ul>
	{#each recipes as recipe}
		<li><a href={`recipes/${recipe.id}`}>{recipe.name}</a></li>
	{/each}
</ul>

<div>
	<a href='/recipes/create'>Add a new recipe</a>
</div>