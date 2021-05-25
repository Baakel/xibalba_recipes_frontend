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
				if (res.status === 401) {
					error = 'Username is incorrect';
				}
				if (res.status === 403) {
					error = 'Password is incorrect';
				}
			}
		} catch (err) {
			console.log(err);
			error = 'Server unavailable';
		}
	}

	function sendIt(keypress) {
		// if enter is pressed, call the login function
		if (keypress.keyCode === 13) {
			login();
		}
	}
</script>

<!--<div class="bg-fondo-200 rounded-lg p-8 relative overflow-hidden w-192 max-w-full min-h-96">-->
<div
	class="bg-fondo-200 rounded-lg grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 overflow-hidden w-96 md:w-192 max-w-full min-h-96"
>
	<!--	<div class="form-container absolute top-0 h-full left-0 w-1/2 z-20">-->
	<div
		class="form-container py-8 row-start-1 md:col-start-1 row-end-2 md:col-end-2 h-full w-full z-20"
	>
		<form class="flex justify-center items-center flex-col h-full text-center px-10" action="#">
			<h1 class="text-4xl font-bold mb-8">Login</h1>
			{#if error}
				<span class="text-sm text-primary tracking-wide">{error}</span>
			{/if}
			<input
				class="my-4 p-2 w-full"
				type="text"
				on:keypress={sendIt}
				bind:value={username}
				placeholder="Enter username"
			/>
			<input
				class="p-2 w-full"
				type="password"
				on:keypress={sendIt}
				bind:value={password}
				autocomplete="current-password"
				placeholder="Enter your password"
			/>
			<a class="text-sm text-letters-100 m-4" href="#">Forgot your password?</a>
			<button class="std-btn bg-secondary" on:click|preventDefault={login}>Login</button>
		</form>
	</div>
	<!--	<div class="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-30">-->
	<div
		class="overlay-container row-start-2 md:row-start-1 md:col-start-2 row-end-3 md:row-end-2 md:col-end-3 w-full h-full overflow-hidden z-30"
	>
		<div
			class="overlay bg-primary relative -left-full h-full w-200p bg-gradient-to-r from-primary to-secondary bg-no-repeat bg-cover"
		>
			<div
				class="overlay-panel overlay-right absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0"
			>
				<h1 class="text-4xl font-bold mb-4 text-letters-100">Hello, Friend!</h1>
				<p class="leading-6 text-light tracking-wide mb-8">
					Create an account with us and start cooking!
				</p>
				<button
					class="std-btn bg-transparent border-letters-100 border-2"
					on:click={() => {
						dispatch('tabChange', 'Sign Up');
					}}>Sign Up</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	input {
		@apply bg-fondo-100 text-letters-100;
	}
	input:focus {
		@apply border-secondary border-2 rounded;
	}
</style>
