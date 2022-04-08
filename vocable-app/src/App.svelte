<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	// import * as file from '../words/5words.json';
	import * as all_words from '../words/words.json';
	import {b_click, fanfare} from './sounds';

	import Entry from './Components/Entry.svelte'
	import validation from './validation.js'
	import Keyboard from './Components/Keyboard.svelte'
	import Settings from './Components/Settings.svelte'
	import TopBar from './Components/TopBar.svelte'

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
	<TopBar {toggleSettings}/>
	<main>
		<div class='game'>
			<div class='entries' class:celebration={show_celebration}>
				{#each guesses as o}
					<Entry guess={o.guess} states={o.states}/>
				{/each}
			</div>
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
	<Settings 
	on:change_diff={(e) => {newNumberGame(e.detail.guess_length)}} 
	{guess_length}/>
{/if}
		
<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 100%;
	}

	.all {
		max-height: 100%;
	}

	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
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

.do-blur {
	filter: blur(4px);
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
