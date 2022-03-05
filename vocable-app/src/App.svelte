<script>
	export let name;

	let guess = '';
	$: guessLength = guess.length - 1;

	let correct_guess = "wordle"
	let letter_state = '';

	function checkLetters(str1, str2) 
		{
		for (let i=0;i<guess.length; i++){
			if(guess[guessLength] != correct_guess[i]){
				for(let j=0; j < correct_guess.length; j++){
					if(guess[guessLength] == correct_guess[j]){
						letter_state = "close"
					}
					else {
						letter_state = "wrong"
					}
				}
			}
			else{
				letter_state = "right"
			}
		}
	}
	
</script>

<main>
	<h1>Hello {name}!</h1>
	<input bind:value={guess} placeholder='Enter Guess'/>
	<h3>Guess: {guess}</h3>
	{checkLetters(guess, correct_guess)}
	{letter_state}

	{#if guess == correct_guess}
	<h4 style="color: green">
		Your guess is correct!
	</h4>
	{/if}


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