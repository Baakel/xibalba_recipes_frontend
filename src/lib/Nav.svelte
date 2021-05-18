<script lang="ts">
	import { page, session } from '$app/stores';
	import { goto } from '$app/navigation';
	async function logout() {
		await fetch('http://localhost:8000/api/logout', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		});

		$session.username = '';
		goto('/');
	}
</script>

<nav class="bg-fondo-200">
	<div>
		<h1>Xibalba Recipes</h1>
		<ul>
			<li>
				<a class:current={$page.path === '/'} sveltekit:prefetch href="/"><span>Home</span></a>
			</li>
			{#if $session.username === ''}
				<li>
					<a class:current={$page.path === '/login'} sveltekit:prefetch href="/login"
						><span>Login</span></a
					>
				</li>
			{/if}
			{#if $session.username !== ''}
				<li>
					<a class:current={$page.path === '/dashboard'} href="/dashboard"><span>Dashboard</span></a
					>
				</li>
				<li><a href="#" on:click={logout}>Logout</a></li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	nav {
		padding: 1rem;
		box-shadow: -1px 1px 4px 4px #211e1e;
	}
	nav div {
		max-width: 960px;
		padding: 0 10px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}
	h1 {
		margin-top: 10px;
		font-size: 1.2em;
		font-weight: bold;
		color: #e1dac7;
	}
	ul {
		padding: 0;
		margin: 0;
		text-align: right;
	}
	li {
		display: inline-block;
	}
	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		color: #e1dac7;
	}
	a.current {
		border-bottom: 3px solid #dd5828;
		color: #a49375;
	}
</style>
