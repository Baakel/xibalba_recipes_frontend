<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	export let smol = true;
	if (browser) {
		smol = window.innerWidth < 768;
	}
</script>

<svelte:head>
	<title>Xibalba Recipes</title>
</svelte:head>

<!--<div class="m-4 md:m-0">-->
<!--	<h1 class="pb-5 text-4xl sm:text-7xl uppercase font-bold m-0 text-letters-200">-->
<!--		Welcome to your virtual kitchen-->
<!--	</h1>-->
<!--	<img src="home_banner.jpg" alt="Cooking utensils" />-->
<!--	&lt;!&ndash;	Maybe adding 2 other images? dunno yet &ndash;&gt;-->
<!--	<div>-->
<!--		<img src="" alt="" />-->
<!--		<img src="" alt="" />-->
<!--	</div>-->
<!--	<p class="m-3 md:text-2xl">Start cooking!</p>-->
<!--	<a class="std-btn flex justify-center md:inline-block" type="button" href="/login">Login</a>-->
<!--</div>-->

<!-- the vertical img goes here -->
<div
	class="main-bg bg-baked-bread-s md:bg-kitchen-recipes-s absolute z-m1 w-2/5 right-0 md:bg-no-repeat"
/>
<!--<div class="main-bg" />-->
<div class="main-content pt-20 md:pt-40 pr-16 md:pr-32 pb-14 md:pb-56 pl-12 md:pl-32">
	<h1 class="text-3xl md:text-8xl font-bold md:mb-24">Welcome to your virtual kitchen</h1>
	{#if smol}
		<p class="text-lg pl-25p font-medium mt-6">Share recipes with friends and loved ones</p>
	{:else}
		<p class="text-2xl pl-25p font-medium mt-6">
			Start creating your recipes and share them with friends and loved ones.<br /> Choose new recipes
			every week and get ready to cook without even thinking about it!
		</p>
	{/if}
</div>
<footer class="w-5/6 bg-fondo-200 flex relative">
	<div class="homebanner bg-home-banner-s w-40 h-32 md:w-60 md:h-44 bg-cover bg-center-center" />
	<a
		class="btn rounded md:text-xl text-letters-100 bg-primary self-center md:p-8 relative mx-4 md:mx-auto my-auto whitespace-nowrap"
		type="button"
		href={$session.username ? '/dashboard' : '/login'}>Start cooking</a
	>
	{#if !smol}
		<div class="block one right-8" />
		<div class="block two right-0 top-8" />
	{/if}
</footer>

<style>
	.main-bg {
		/*	this calculation is done to make it span over the whole view port taking the nav out of  consideration */
		height: calc(100vh - 3.3rem - 2rem);
		background-position: 12% 7%;
	}
	@media screen and (min-width: 768px) {
		.main-bg {
			height: calc(100vh - 5.6rem);
			background-position: center left;
		}
	}
	.main-content p::before {
		content: '';
		@apply absolute left-0 h-10 w-1/4 mt-1.5 bg-secondary;
	}
	.block {
		@apply absolute bg-fondo-100 w-8 h-8;
	}
</style>
