<script lang="ts">
	import '../app.css';
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte'
</script>

<!-- Any stuff here will be applied to the entirety of the app -->
<svelte:head>
</svelte:head>

<Nav />

<main>
<!-- this is where the components get injected -->
	<slot />
</main>

<Footer />

<style>
    a {
        text-decoration: none;
        color: gray;
        margin-right: 1rem;
    }
    main {
        position: relative;
        max-width: 960px;
        background-color: #34342d;
        padding: 60px 10px;
        margin: 0 auto;
    }
</style>