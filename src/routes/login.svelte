<script context="module" lang="ts">
	export const prerender = true;

</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/Login.svelte';
	// export let result;
	const username = 'Baakel';
	const password = '10charpassword';
	let result = null;
	let u_id = null;

	function redirectToDashboard() {
		goto('/dashboard')
	}

	async function signIn() {
		const res = await fetch('http://localhost:8000/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' }
			// mode: "cors",
		});

		let headz = await res;
		console.log(headz);
		console.log(headz.headers);
		result = JSON.stringify(headz);
	}

	// async function patch(res: Response) {
	// 	const body = await res.json();
	// }
</script>

<svelte:head>
	<title>Xibalba Login</title>
</svelte:head>

<main>
	<h1>Log in or Register for a good</h1>
	<h2>Result:</h2>
	<p>{result}</p>
	<form action='http://localhost:8000/api/login' method='post'>
		<input type='text' name='username' value='Baakel'/>
		<input type='text' name='password' value='10charpassword'/>
		<button type='submit'>Sign in</button>
	</form>
	<button type='button' on:click={signIn}>Log in</button>
	<a href='http://localhost:8000/query'>
		<button>Register</button>
	</a>
	<Login on:success={redirectToDashboard}/>
</main>
