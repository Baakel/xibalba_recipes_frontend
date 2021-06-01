<script lang="ts">
	import { page, session } from '$app/stores';
	import { goto } from '$app/navigation';
	async function logout() {
		// await fetch('http://localhost:8000/api/logout', {
		// 	method: 'GET',
		// 	mode: 'cors',
		// 	credentials: 'include'
		// });
		await fetch('/logout.json');

		$session.username = '';
		goto('/');
	}

	let list_hidden = true;
	const medWindow = 768;
	function showMenu() {
		if (window.innerWidth < medWindow) {
			list_hidden = !list_hidden;
		}
	}
</script>

<nav class="bg-fondo-200 shadow">
	<div class="flex justify-around items-center mx-3.5">
		<h1 class:hidden={!list_hidden} class="pb-3.5">Xibalba Recipes</h1>
		<div
			on:click={showMenu}
			class:hidden={!list_hidden}
			class="md:hidden cursor-pointer text-letters-100"
			id="burger"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</div>

		<ul class:hidden={list_hidden} class="md:block" id="menu">
			<li>
				<a on:click={showMenu} class:current={$page.path === '/'} sveltekit:prefetch href="/"
					><span>Home</span></a
				>
			</li>
			{#if $session.username === ''}
				<li>
					<a
						on:click={showMenu}
						class:current={$page.path === '/login'}
						sveltekit:prefetch
						href="/login"><span>Login</span></a
					>
				</li>
			{/if}
			{#if $session.username !== ''}
				<li>
					<a on:click={showMenu} class:current={$page.path === '/dashboard'} href="/dashboard"
						><span>Dashboard</span></a
					>
				</li>
				<li>
					<a
						on:click={showMenu}
						class:current={$page.path === '/recipes'}
						sveltekit:prefetch
						href="/recipes"><span>Recipes</span></a
					>
				</li>
				<li><a on:click={showMenu} href="#" on:click={logout}>Logout</a></li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	nav {
		padding: 1rem;
		/*box-shadow: -1px 1px 4px 4px #211e1e;*/
	}
	h1 {
		margin-top: 10px;
		font-size: 1.2em;
		font-weight: bold;
		color: #e1dac7;
	}
	ul {
		@apply p-0 m-0 text-right;
	}
	li {
		@apply inline-block;
	}
	a {
		@apply px-2 py-4 block text-letters-100 no-underline capitalize;
	}
	a.current {
		/*border-bottom: 3px solid #dd5828;*/
		/*color: #a49375;*/
		@apply font-semibold text-letters-200 border-b-2 border-solid border-primary;
	}
</style>
