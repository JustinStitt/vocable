<script>
	export let name;
	import * as file from './5words.json';

	let guess = '';
	let words = file.default
	let random = Math.floor(Math.random() * words.length)

	let correct_guess = words[random].toLowerCase()
</script>

<main>
	<h1>Hello {name}!</h1>
	<input bind:value={guess} placeholder='Enter Guess'/>
	<h3>Guess: {guess}</h3>
	{#if guess == correct_guess}
	<h4 style="color: green">
		Your guess is correct!
	</h4>
	{/if}

	<p>Random word: {words[random].toUpperCase()}</p>

	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
