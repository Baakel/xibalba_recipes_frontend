<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let username;
	let password;
	let error;

	async function login() {
		error = undefined;
		try {
			const res = await fetch('http://localhost:8000/api/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				credentials: 'include'
			});

			if (res.ok) {
				// This dispatch success is the thing that is called in the on:success of the Login component
				dispatch('success')
			} else {
				error = 'Error in the database (probably unauth response)'
			}
		} catch (err) {
			console.log(err)
			error = 'Catching error while fetching login api'
		}
	}
</script>

<h1>Login</h1>
<input type='text' bind:value={username} placeholder='Enter username'>
<input type='password' bind:value={password} placeholder='Enter your password'>
<button on:click={login}>Login</button>