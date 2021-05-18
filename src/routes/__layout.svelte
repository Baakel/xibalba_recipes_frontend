<script context="module" lang="ts">

</script>

<script lang="ts">
	import '../app.css';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
</script>

<!-- Any stuff here will be applied to the entirety of the app -->
<svelte:head />

<Nav />

<main>
	<!-- this is where the components get injected -->
	<slot />
</main>

<Footer />

<!--<style global lang='postcss'>-->
<!--		-->
<!--</style>-->
