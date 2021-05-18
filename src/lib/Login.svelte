<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { session } from '$app/stores';

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
				dispatch('success');
				$session.username = username;
			} else {
				error = 'Error in the database (probably unauth response)';
			}
		} catch (err) {
			console.log(err);
			error = 'Catching error while fetching login api';
		}
	}

	function sendit(keypress) {
		// if enter is pressed, call the login function
		if (keypress.keyCode === 13) {
			login();
		}
	}
</script>

<h1>Login</h1>
<input type="text" on:keypress={sendit} bind:value={username} placeholder="Enter username" />
<input
	type="password"
	on:keypress={sendit}
	bind:value={password}
	placeholder="Enter your password"
/>
<button class="std-btn" on:click={login}>Login</button>
