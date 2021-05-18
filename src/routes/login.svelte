<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/Login.svelte';

	let result = null;

	function redirectToDashboard() {
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Xibalba Login</title>
</svelte:head>

<main>
	<h1>Log in or Register for a good</h1>
	<h2>Result:</h2>
	<p>{result}</p>
	<form action="http://localhost:8000/api/login" method="post">
		<input type="text" name="username" value="Baakel" />
		<input type="text" name="password" value="10charpassword" />
		<button type="submit">Sign in</button>
	</form>
	<a href="http://localhost:8000/query">
		<button>Register</button>
	</a>
	<Login on:success={redirectToDashboard} />
</main>
