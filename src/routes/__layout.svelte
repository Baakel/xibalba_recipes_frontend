<script context="module" lang="ts">
</script>

<script lang="ts">
	import '../app.css';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import { page } from '$app/stores';
</script>

<!-- Any stuff here will be applied to the entirety of the app -->
<svelte:head />

{#if $page.path !== '/'}
	<Nav />
	<main class="relative bg-fondo-100 mx-1 my-auto px-0 py-0 md:px-16 md:py-16">
		<!-- this is where the components get injected -->
		<slot />
	</main>
	<Footer />
{:else}
	<main class="relative bg-fondo-100 mx-0 p-0 z-0">
		<Nav />
		<!-- this is where the components get injected -->
		<slot />
	</main>
{/if}

<style lang="postcss">
</style>
