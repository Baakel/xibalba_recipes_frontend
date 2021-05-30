<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Recipe, Ingredient } from '$lib/types';

	let name: string;
	let publico = false;
	let servings: string;
	let steps = [{ id: 0, paso: '' }];
	let mealType: string;
	let calories: number;
	let carbohydrates: number;
	let fat: number;
	let protein: number;
	let tipo: string;
	let ingredients: Ingredient[] = [{ name: '', amount: '' }];
	let time: string;
	let error;

	const addNewIng = () => {
		ingredients = [...ingredients, { name: '', amount: '' }];
	};

	const removeIng = () => {
		ingredients.pop();
		ingredients = [...ingredients];
	};

	const addNewStep = () => {
		let index = steps.length;
		steps = [...steps, { id: index, paso: '' }];
	};
	const removeStep = () => {
		steps.pop();
		steps = [...steps];
	};
	const validate = (): boolean => {
		if (!name) {
			error = "Name can't be empty";
			window.scrollTo(0, 0);
			return false;
		}
		if (calories && (calories < 0 || !Number.isInteger(calories))) {
			error = 'Calories need to be a positive integer';
			window.scrollTo(0, 0);
			return false;
		}
		if (carbohydrates && carbohydrates < 0) {
			error = 'Carbohydrates need to be a positive number';
			window.scrollTo(0, 0);
			return false;
		}
		if (fat && fat < 0) {
			error = 'Fat needs to be a positive number';
			window.scrollTo(0, 0);
			return false;
		}
		if (protein && protein < 0) {
			error = 'Protein needs to be a positive number';
			window.scrollTo(0, 0);
			return false;
		}
		return true;
	};
	const handleSubmit = async () => {
		error = undefined;
		if (!validate()) return error;
		let stepArray: string[] = steps.filter((step) => step.paso).map((step) => step.paso);
		let newIngredients = ingredients.filter((ing) => ing.name);
		ingredients = newIngredients ? newIngredients : undefined;
		let recipe: Recipe = {
			name,
			public: publico,
			tipo,
			calories,
			carbohydrates,
			fat,
			protein,
			servings,
			mealType,
			ingredients,
			time,
			steps: stepArray
		};
		try {
			error = undefined;
			const res = await fetch('/recipes/create.json', {
				method: 'POST',
				body: JSON.stringify(recipe)
			});

			if (res.ok) {
				goto('/dashboard');
			}
			error = "Couldn't create the recipe ";
		} catch (err) {
			console.log(err);
			error = 'Server unavailable';
		}
	};
	const focusEl = (element) => {
		if (element.id !== 'step-0' && element.id !== 'ing-0') {
			element.focus();
		}
	};
</script>

<h2 class="text-4xl font-bold text-center">Add a new recipe</h2>
{#if error}
	<h3 class="text-primary text-center tracking-wide">{error}</h3>
{/if}

<form
	class="my-10 mx-auto text-left w-11/12 md:w-4/5 lg:w-2/3 bg-fondo-200 p-12 rounded-lg"
	on:submit|self|preventDefault={handleSubmit}
>
	<label for="r-name">Recipe Name</label>
	<input
		name="r-name"
		id="r-name"
		type="text"
		placeholder="Recipe Name"
		bind:value={name}
		required
	/>
	<div class="flex justify-between">
		<label class="text-letters-200 font-semibold">Ingredients</label>
		<div>
			<a href="#" on:click|self|preventDefault={addNewIng} class="std-btn px-3 py-0.5">+</a>
			<a href="#" on:click|self|preventDefault={removeIng} class="std-btn px-3 py-0.5">-</a>
		</div>
	</div>
	{#each ingredients as ingredient, index (ingredients[index])}
		<div class="grid grid-cols-4 gap-3">
			<input
				class="col-span-2"
				type="text"
				id={'ing-' + index}
				name={'ing-' + index}
				on:keydown|self={(e) => {
					if (!ingredient.name && !ingredient.amount && e.keyCode === 8) removeIng();
					if (e.keyCode === 13) addNewIng();
				}}
				use:focusEl
				bind:value={ingredient.name}
				placeholder="Ingredient name"
			/>
			<input
				type="text"
				id={'am-' + index}
				name={'am-' + index}
				on:keydown|self={(e) => {
					if (!ingredient.name && !ingredient.amount && e.keyCode === 8) removeIng();
					if (e.keyCode === 13) addNewIng();
				}}
				bind:value={ingredient.amount}
				placeholder="Ingredient amount"
			/>
			<input
				type="text"
				id={'tipo-' + index}
				name={'tipo-' + index}
				bind:value={ingredient.tipo}
				placeholder="Type (meat, eggs, vegetable)"
			/>
		</div>
	{/each}
	<div class="flex justify-between">
		<label class="text-letters-200 font-semibold">Steps</label>
		<div>
			<a href="#" on:click|self|preventDefault={addNewStep} class="std-btn px-3 py-0.5">+</a>
			<a href="#" on:click|self|preventDefault={removeStep} class="std-btn px-3 py-0.5">-</a>
		</div>
	</div>
	{#each steps as step, i (step.id)}
		<div class="flex">
			<input
				type="text"
				id={'step-' + i}
				name={'step-' + i}
				on:keydown|self={(e) => {
					if (!step.paso && e.keyCode === 8) removeStep();
					if (e.keyCode === 13) addNewStep();
				}}
				use:focusEl
				bind:value={step.paso}
				placeholder="Step numbers will be added automatically"
			/>
		</div>
	{/each}
	<label for="mealType">Meal Type</label>
	<input type="text" id="mealType" bind:value={mealType} placeholder="(e.g. Dinner or Dessert)" />
	<label for="calories">Calories</label>
	<input type="number" id="calories" placeholder="in kCal" min="0" bind:value={calories} />
	<label for="carbs">Carbohydrates</label>
	<input
		type="number"
		min="0"
		placeholder="in grams"
		step="any"
		bind:value={carbohydrates}
		id="carbs"
	/>
	<label for="fat">Fat</label>
	<input type="number" min="0" placeholder="in grams" step="any" bind:value={fat} id="fat" />
	<label for="prot">Protein</label>
	<input type="number" min="0" placeholder="in grams" step="any" bind:value={protein} id="prot" />
	<label for="tipo">Dietary Type</label>
	<input
		type="text"
		id="tipo"
		placeholder="(e.g. Vegan, Vegetarian, Fish, Meat, Egg, Dairy)"
		bind:value={tipo}
	/>
	<label for="servings">Number of Servings</label>
	<input
		name="servings"
		id="servings"
		type="text"
		placeholder="Servings for how many people?"
		bind:value={servings}
	/>
	<label for="time">Cooking Time</label>
	<input
		type="text"
		id="time"
		placeholder="How long before you are ready to enjoy your meal?"
		bind:value={time}
	/>
	<div class="block">
		<label for="public">Public</label>
		<input class="w-1/12" type="checkbox" id="public" bind:checked={publico} />
	</div>
	<div class="text-center">
		<a href="#" on:click={handleSubmit} class="std-btn inline-block">Add new recipe</a>
	</div>
</form>

<style>
	label {
		@apply text-letters-200 font-semibold text-lg;
	}
	input[type='text'] {
		@apply block w-full p-3 my-3 mx-auto rounded-md bg-fondo-100 text-letters-100;
	}
	input[type='number'] {
		@apply block w-full p-3 my-3 mx-auto rounded-md bg-fondo-100 text-letters-100;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
	input[type='checkbox'] {
		@apply ml-2 my-5;
	}
</style>
