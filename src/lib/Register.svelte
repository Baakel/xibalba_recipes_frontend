<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { session } from '$app/stores';

	const dispatch = createEventDispatcher();

	let username;
	let password;
	let email;
	let passError;
	let dbError;
	let userError;
	let emailError;
	let showPassword = false;

	const handlePass = (e: Event) => {
		password = (e.currentTarget as HTMLInputElement).value;
	};

	function validateEmail(mail) {
		const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
		return re.test(String(mail).toLowerCase());
	}

	async function register() {
		passError = null;
		dbError = null;
		userError = null;
		emailError = null;

		!username ? (userError = "Username can't be empty") : userError;
		!email ? (emailError = "Email can't be empty") : emailError;
		!password ? (passError = "Password can't be empty") : passError;

		if (username.length < 3) {
			userError = 'Username needs to be longer than 3 characters';
			return userError;
		}
		if (!validateEmail(email)) {
			emailError = `${email} is not a valid email`;
			return emailError;
		}
		if (password.length < 10) {
			passError = 'Password needs to be longer than 10 characters';
			return passError;
		}
		try {
			const res = await fetch('http://localhost:8000/api/users/new', {
				method: 'POST',
				body: JSON.stringify({ username, password, email }),
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				credentials: 'include'
			});

			if (res.ok) {
				// This dispatch success is the thing that is called in the on:success of the Login component
				dispatch('success');
				$session.username = username;
			} else {
				if (res.status === 403) {
					dbError = 'User already exists!';
				}
				if (res.status === 401) {
					dbError = 'Email is already in use!';
				}
			}
		} catch (err) {
			console.log(err);
			dbError = 'Catching error while fetching login api';
		}
	}
</script>

<!--<div class="bg-fondo-200 rounded-lg p-8 relative overflow-hidden w-192 max-w-full min-h-96">-->
<div
	class="bg-fondo-200 rounded-lg grid grid-rows-2 md:grid-rows-1 grid-flow-col-dense md:grid-flow-row-dense md:grid-cols-2 overflow-hidden w-96 md:w-192 max-w-full min-h-96"
>
	<!--	<div class="form-container absolute top-0 h-full right-0 w-1/2 z-20">-->
	<div
		class="form-container row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-3 h-full w-full z-20"
	>
		<form
			on:submit|preventDefault={register}
			class="flex py-8 justify-center items-center flex-col h-full text-center px-10"
			action="#"
		>
			<h1 class="text-4xl font-bold mb-8">Sign up</h1>
			{#if dbError}
				<span class="text-primary text-xs tracking-wide">{dbError}</span>
			{/if}
			{#if userError}
				<span class="text-primary text-xs tracking-wide">{userError}</span>
			{/if}
			<input
				class="mb-4 p-2 w-full"
				type="text"
				bind:value={username}
				placeholder="Enter username"
				minlength="3"
				required
			/>
			{#if emailError}
				<span class="text-primary text-xs tracking-wide">{emailError}</span>
			{/if}
			<input
				class="mb-4 p-2 w-full"
				type="email"
				bind:value={email}
				placeholder="Enter email"
				required
			/>
			{#if passError}
				<span class="text-xs text-primary tracking-wide">{passError}</span>
			{/if}
			<div class="relative w-full">
				<input
					class="p-2 w-full"
					type={showPassword ? 'text' : 'password'}
					on:input={handlePass}
					autocomplete="new-password"
					placeholder="Enter password"
					minlength="10"
					required
				/>
				<span
					class="absolute hidden md:inline-block cursor-help text-sm right-1 top-1/4"
					on:mouseenter={() => (showPassword = true)}
					on:mouseleave={() => (showPassword = false)}
					>️
					{showPassword ? '🙈' : '👁️'}
				</span>
			</div>
			<!--			<button class="std-btn" on:click|preventDefault={register}>Sign up</button>-->
			<button class="std-btn mt-8">Sign up</button>
		</form>
	</div>
	<!--	<div class="overlay-container absolute top-0 left-0 w-1/2 h-full overflow-hidden z-30">-->
	<div
		class="overlay-container row-start-1 row-end-2 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2 w-full h-full overflow-hidden z-30"
	>
		<div
			class="overlay bg-primary relative -left-full h-full w-200p bg-gradient-to-l from-primary to-secondary bg-no-repeat bg-cover"
		>
			<div
				class="overlay-panel overlay-right absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0"
			>
				<h1 class="text-4xl font-bold mb-4 text-letters-100">Welcome Back!</h1>
				<p class="leading-6 text-light tracking-wide mb-8">
					To continue cooking please log in to your account
				</p>
				<button
					class="std-btn bg-transparent border-letters-100 border-2"
					on:click={() => {
						dispatch('tabChange', 'Login');
					}}>log in</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	input {
		@apply bg-fondo-100 text-letters-100;
	}
	input:invalid:focus {
		@apply border-secondary border-2 rounded;
	}
	input:valid:focus {
		@apply border-primary border-2 rounded;
	}
</style>
