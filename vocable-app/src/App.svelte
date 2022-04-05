<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	// import * as file from '../words/5words.json';
	import * as all_words from '../words/words.json';
	import {b_click, fanfare} from './sounds';

	import Entry from './Components/Entry.svelte'
	import validation from './validation.js'
	import Keyboard from './Components/Keyboard.svelte'

	let interactive_debug = 0;
	let DEBUG = false;
	let guess = '';
	let guesses = [];
	let words = all_words.default
	let random = 0
	let guess_length = 5;
	let num_guesses = 6;
	let current_guess = 0;
	let win = false;
	let mount = false;
	let oskb_states = {};
	let show_settings = false;
	let show_celebration = false;

	const getNewRandomWord = () => {
		random = Math.floor(Math.random() * words[String(guess_length)].length)
	} 

	const makeGuess = () => {
		if (guess == '') {
			interactive_debug += 1;
			if (interactive_debug >= 3) {
				DEBUG = !DEBUG;
				interactive_debug = 0;
			}
		}
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
		b_click()
		win = result.win;
		if(win) fanfare();
		guess = '';
		current_guess += 1
		if (win && current_guess == 1) show_celebration = true;
	}

	const initialGuessSetup = () => {
		guesses = Array(num_guesses);
		for (let i = 0; i < guesses.length; i++) {
			let def = {
			guess: Array(guess_length+1).join(' '),
			states: Array(guess_length).fill(-2), // default state is -2
			}
			guesses[i] = def;
		}
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

	$: correct_word = words[String(guess_length)][random].toLowerCase();

	$: {
		if (mount && current_guess < num_guesses) {
			guesses[current_guess].guess = guess + 
					Array(guess_length - guess.length + 1).join(' ');
		}
	}

	document.onkeydown = (event) => {
		b_click();

		let key = event.key.toLowerCase();
		let keycode = event.keyCode;
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

	const toggleSettings = () => {
		show_settings = !show_settings;
	}

	const newGame = () => {
		initialGuessSetup();
		getNewRandomWord();
		current_guess = 0;
		oskb_states = {};
		win = false;
		show_celebration = false;
	}

	$: guess = win ? '' : guess

	function newNumberGame(letterNum) {
		show_settings = false;
		if (guess_length == letterNum) return;
		guess_length = letterNum;
		guess = '';
		newGame();
	}
</script>
<div class='all' class:do-blur={show_settings}>

	<div class='navbar'>
		<div class='menu-left'></div>
		<div class='title'>Vocable</div>
		<div class='menu-right'>
			<svg on:click={toggleSettings} class='settings' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path fill="aliceblue" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path>
			</svg>
		</div>
	</div>

	<main>
		<div class='game'>
			
			<div class='entries' class:celebration={show_celebration}>
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
				WINNER! {show_celebration ? ' IN ONE GUESS!' : ''}
				<button on:click={newGame}>Play again?</button>
				{/if}
				<button class='submit' on:click={makeGuess}>Make Guess</button>
				<Keyboard on:oskb_click={handleOSKB} on:oskb_backspace={handleOSKB_backspace} states={oskb_states}/>
				
			</div> <!-- end game div -->
			{#if DEBUG}
			<div class='debug'>
				<p>Correct Word: {correct_word}</p>
				<button on:click={getNewRandomWord}>Get New Word</button>
				<button on:click={newGame}>reset game</button>
			</div>
			{/if}
		</main>
		
	</div>
	{#if show_settings}
	<div class='difficulty' in:fade out:fade>
		<h3>Letters: </h3>
		<button class:in-use={guess_length==4} class='diff-button' on:click={() => newNumberGame(4)}>4</button>
		<button class:in-use={guess_length==5} class='diff-button' on:click={() => newNumberGame(5)}>5</button>
		<button class:in-use={guess_length==6} class='diff-button' on:click={() => newNumberGame(6)}>6</button>
	</div>
	{/if}
		
<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 100%;
	}

	.diff-button {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid aliceblue;
	}

	.all {
		max-height: 100%;
	}

	.title {
		font-size: 40px;
		font-weight: 500;
		line-height: 100%;
		letter-spacing: 0.02em;
		text-align: center;
	}

	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		min-height: 20px;
		color: aliceblue;
		text-align: center;
		border-bottom: 2px solid grey;
		margin-bottom: 10px;
		padding-bottom: 7px;
	}

	.menu-right {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 50px;
	}

	.menu-left {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background-color: blue;
		width: 50px;
	}

	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.settings {
		justify-self: center;
		padding: 0 10px;
		margin-right: 10px;
	}

	.settings:hover {
		animation: 0.5s linear 0s forwards alternate settingsRotate, 0.5s linear 3.5s forwards reverse settingsRotate;
	}
	
	@keyframes settingsRotate {
		0% {
			transform: rotateZ(0);
		}
		100% {
			transform: rotateZ(180deg);
		}
	}
button {
	color: rgb(194, 228, 255);
	background-color: rgb(112, 106, 106);
	border: 1px solid #333;
	margin-top: 10px;
	margin-bottom: -2px;
	width: 100px;
	align-self: center;
}

h2 {
	text-transform: uppercase;
	font-weight: 500;
	font-size: 30px;
	margin: 0;
}

@media (min-width: 640px) {
	main {
		max-width: none;
	}
}

.debug {
	position: absolute;
	transform: translateX(-330px);
	display: flex;
	flex-direction: column;
	justify-items: flex-end;
}

.debug p{
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
	align-items: center;
	width: 100%;
	height: 50%;
	display: flex;
	flex-direction: column;
	min-height: 120px;

}

@media only screen and (max-height: 550px) {
	.entries {
		overflow-y: scroll;
		overflow-x: hidden;
	}
}

.difficulty {
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	position: absolute;
  top: 15%;
  text-align: center;
  width: 20%;
  background-color: rgba(51, 51, 51, 0.819);
  border: 1px solid aliceblue;
  border-radius: 10px;
  padding-bottom: 10px;
  line-height: 100%;
}

.do-blur {
	filter: blur(4px);
}

.in-use {
	background-color: rgb(38, 207, 151);
}

.celebration {
	animation: fast-spin 1.5s linear infinite;
}

@keyframes fast-spin {
	0% {
		transform: rotateY(0);
	}
	100% {
		transform: rotateY(360deg);
	}
}

</style>
