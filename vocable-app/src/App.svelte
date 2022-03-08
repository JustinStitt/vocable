<script>
	import { onMount } from 'svelte';
	import * as file from './5words.json';
	import Block from './Components/Block.svelte'
	import Entry from './Components/Entry.svelte'
	import validation from './validation.js'


	let guess = '';
	let guesses = [];
	let words = file.default
	let random = 0
	
	let guess_length = 5;
	let num_guesses = 6;
	let current_guess = 0;
	let win = false;

	let input_box;
	
	const getNewRandomWord = () => {
		random = Math.floor(Math.random() * words.length)
	} 

	const makeGuess = () => {
		if (current_guess > num_guesses - 1) return
		if (guess.length != guess_length) return
		guesses[current_guess].guess = guess
		// TO-DO (justin): validation
		let result = validation(guess, correct_word)
		guesses[current_guess].states = [...result.letter_states]
		win = result.win;
		current_guess += 1
		input_box.value = ''
	}

	const initialGuessSetup = () => {
		guesses = Array(num_guesses);
		for (let i = 0; i < guesses.length; i++) {
			let def = {
			guess: Array(guess_length+1).join(' '),
			states: Array(guess_length).fill(0), // default state is 0
			}
			guesses[i] = def;
		}				
		console.log(guesses)
	}

	$: correct_word = words[random].toLowerCase()

	/* runs once when component mounts (inserted into DOM) */
	onMount(() => {getNewRandomWord(); initialGuessSetup();})
</script>

<main>
	<div class='top'>
		<h2>Vocable</h2>
	</div>
	<div class='entries'>
		{#each guesses as o}
			<Entry guess={o.guess} states={o.states}/>
		{/each}
	</div>

	<input type="text"
	 maxlength={guess_length} 
	bind:value={guess} 
	bind:this={input_box}
	placeholder='Enter Guess'
	oninput="this.value = this.value.toUpperCase()"
	/>

	<button  on:click={makeGuess}>Make Guess</button>
	{#if win}
		WINNER!
	{/if}
	<p>Random word: {words[random].toUpperCase()}</p>
	<button on:click={getNewRandomWord}>Get New Word</button>
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>

<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.top {
		width: 100%;
		padding-bottom: 10px;
	}

	h2 {
		color: rgb(81, 84, 102);
		text-transform: uppercase;
		font-weight: 500;
		font-size: 30px;
		margin: 0;
		border-bottom: 2px solid grey;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
	.entries {
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: rgba(51, 51, 51, 0.041);
	}
</style>
