<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
</script>

<svelte:head>
	<title>Xibalba Recipes</title>
</svelte:head>

<img src="home_banner.jpg" alt="Cooking banner" />
<div class='flex justify-center'>
	<h1>Welcome to Xibalba please log in to continue</h1>
	<a class="std-btn" type="button" href="/login">Log in</a>
</div>

<style>
	h1,
	p {
		@apply text-center;
		@apply mx-auto;
	}
	h1 {
		font-size: 2em;
		@apply uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
		color: #e1dac7;
	}

	img {
		width: 100vw;
		margin: 0 auto;
		display: block;
	}

	a {
		margin-top: 40px;
		text-decoration: none;
		/*@apply p-4 0.5em;*/
		padding: 1em 0.5em;
		display: block;
		color: #e1dac7;
	}

	div {
		margin-top: 60px;
	}

	@screen sm {
		h1 {
			font-size: 4em;
		}
	}
</style>
