<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let items;
	export let activeItem;
</script>

<div class="tabs mb-10">
	<ul class='flex justify-center p-0'>
		{#each items as item}
			<li class='mx-2 my-0 text-letters-200 cursor-pointer font-semibold text-lg' on:click={() =>
			dispatch('tabChange', item)}>
				<div class:active={item === activeItem}>{item}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.active {
		@apply text-primary border-b-2 border-solid border-primary pb-2;
	}
</style>
