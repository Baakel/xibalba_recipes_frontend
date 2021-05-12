<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">

</script>

<svelte:head>
	<title>Xibalba Recipes</title>
</svelte:head>

<img src='home_banner.jpg' alt='Cooking banner' />
<div>
	<h1>Welcome to Xibalba please log in to continue</h1>
	<a type='button' href='/login'>Log in</a>
</div>

<style>
    h1, p {
        text-align: center;
        margin: 0 auto;
    }
    h1 {
        font-size: 2em;
        text-transform: uppercase;
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
        padding: 1em 0.5em;
        display: block;
        color: #e1dac7;
    }

    div {
        margin-top: 60px;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>