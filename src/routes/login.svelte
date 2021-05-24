<script context="module" lang="ts">
	export const prerender = true;
	import type { Load } from '@sveltejs/kit';
	
	export const load: Load = async ({session}) => {
		if (session.username) {
			return {
				redirect: '/dashboard',
				status: 302
			}
		}
		return {
			props: ''
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/Login.svelte';
	// import Tabs from '$lib/Tabs.svelte';
	import Register from '$lib/Register.svelte';
	
	function redirectToDashboard() {
		goto('/dashboard', true);
	}

	// Tabs
	// let items = ['Login', 'Sign Up'];
	let activeItem = 'Login';
	const changedTab = (e) => {
		activeItem = e.detail;
	};
</script>

<svelte:head>
	<title>Xibalba Login</title>
</svelte:head>

<div class="flex justify-center items-center flex-col h-full mt-8 md:mt-24">
	<!--	<h1 class='text-5xl font-bold'>Log in or Register</h1>-->
	<!--	<form action="http://localhost:8000/api/login" method="post">-->
	<!--		<input type="text" name="username" value="Baakel" />-->
	<!--		<input type="text" name="password" value="10charpassword" />-->
	<!--		<button type="submit">Sign in</button>-->
	<!--	</form>-->
	{#if activeItem === 'Login'}
		<Login on:success={redirectToDashboard} on:tabChange={changedTab} />
	{:else}
		<Register on:success={redirectToDashboard} on:tabChange={changedTab} />
	{/if}
</div>
