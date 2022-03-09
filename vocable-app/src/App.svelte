<script>
	import { onMount } from 'svelte';
	import * as file from './5words.json';
	import Entry from './Components/Entry.svelte'
	import validation from './validation.js'
	import Keyboard from './Components/Keyboard.svelte'

	let DEBUG = false;
	let guess = '';
	let guesses = [];
	let words = file.default
	let random = 0
	
	let guess_length = 5;
	let num_guesses = 6;
	let current_guess = 0;
	let win = false;
	let mount = false;
	let oskb_states = {};
	
	const getNewRandomWord = () => {
		random = Math.floor(Math.random() * words.length)
	} 

	const makeGuess = () => {
		if (current_guess > num_guesses - 1) return
		if (guess.length != guess_length) return
		guesses[current_guess].guess = guess
		let result = validation(guess, correct_word)
		guesses[current_guess].states = [...result.letter_states]
		// oskb
		for (let i = 0; i < result.letter_states.length; ++i) {
			let letter = guess[i].toLowerCase();
			let state = result.letter_states[i]; 
			if (state < oskb_states[letter]) continue
			oskb_states[letter] = state == 0 ? -1 : state;
		}

		win = result.win;
		guess = '';
		current_guess += 1
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

	// handle on-screen keyboard
	const handleOSKB = (event) => {
		if (guess.length >= guess_length) return;
		let pressed = event.detail.key.toUpperCase();
		guess += pressed;
	}

	const handleOSKB_backspace = (event) => {
		if (guess.length < 1) return;
		guess = guess.slice(0, guess.length - 1)
	}

	$: correct_word = words[random].toLowerCase()

	$: {
		if (mount && current_guess < num_guesses) {
			guesses[current_guess].guess = guess + 
					Array(guess_length - guess.length + 1).join(' ');
		}
	}

	document.onkeydown = (event) => {
		let key = event.key.toLowerCase();
		let keycode = event.keyCode;
		console.log(event)
		if (key == 'backspace') {
			guess = guess.slice(0, guess.length - 1)
			return;
		}
		if (key == 'enter') {
			makeGuess();
			return;
		}
		if (keycode >= 65 && keycode <= 90 && guess.length < guess_length) {
			guess += key.toUpperCase();
		}
	}

	/* runs once when component mounts (inserted into DOM) */
	onMount(() => {getNewRandomWord(); initialGuessSetup(); mount = true;})
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

	<!-- <input type="text"
	 maxlength={guess_length} 
	bind:value={guess} 
	bind:this={input_box}
	placeholder='Enter Guess'
	autofocus
	oninput="this.value = this.value.toUpperCase()"
	/> -->

	{#if win}
	WINNER!
	{/if}
	{#if DEBUG}
		<div class='debug'>
			<p>Random word: {words[random].toUpperCase()}</p>
			<button on:click={getNewRandomWord}>Get New Word</button>
		</div>
	{/if}
	<button class='submit' on:click={makeGuess}>Make Guess</button>
	<Keyboard on:oskb_click={handleOSKB} on:oskb_backspace={handleOSKB_backspace} states={oskb_states}/>
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>

<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-height: 100%; /* no scroll */
	}

	button {
		color: rgb(194, 228, 255);
		background-color: rgb(112, 106, 106);
		border: 1px solid #333;
		margin-top: 10px;
		margin-bottom: -2px;
	}

	.top {
		width: 100%;
		padding-bottom: 10px;
	}

	h2 {
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

	.debug {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.debug p{
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.376);
		margin-left: 10px;
		margin-right: 10px;
		border: 1px solid red;
		border-radius: 5px;
		color: transparent;
		text-overflow: hidden;
	}

	.debug p:before  {
		content: "DEBUG";
		color: aliceblue;
	}
	
	.debug p:hover:before {
		content: "";
	}

	.debug p:hover {
		color: aliceblue;
	}
	
	.entries {
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
