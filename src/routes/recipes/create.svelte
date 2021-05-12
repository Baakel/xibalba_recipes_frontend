<script>
	import { goto } from '$app/navigation';
	let name;
	let publico;
	let servings;
	const handleSubmit = () => {
		console.log(name, servings)
		goto('/');
	}
</script>

<style>
	h2 {
			text-align: center;
	}
	form {
			max-width: 360px;
      margin: 40px auto;
      text-align: center;
	}
	input, textarea {
			display: block;
      width: 100%;
			padding: 10px;
      margin: 10px auto;
      border-radius: 8px;
	}
</style>

<h2>Add a new recipe</h2>

<form on:submit|preventDefault={handleSubmit}>
	<input type='text' placeholder='Recipe Name' bind:value={name} required>
	<input type='text' placeholder='Servings' bind:value={servings}>
	<button class='btn'>Add new recipe</button>
</form>