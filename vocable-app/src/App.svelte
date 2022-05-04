<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import * as all_words from "../words/words.json";
  import { b_click, fanfare } from "./sounds";
  import { clickOutside } from "./click_outside";

  import Entry from "./Components/Entry.svelte";
  import NewGameModal from "./Components/NewGameModal.svelte";
  import WinScreen from "./Components/WinScreen.svelte";

  import validation from "./validation.js";
  import Keyboard from "./Components/Keyboard.svelte";
  import Settings from "./Components/Settings.svelte";
  import TopBar from "./Components/TopBar.svelte";

  let interactive_debug = 0;
  let DEBUG = false;
  let guess = "";
  let guesses = [];
  let words = all_words.default;
  let random = 0;
  let guess_length = 5;
  let num_guesses = 6;
  let current_guess = 0;
  let win = false;
  let mount = false;
  let oskb_states = {};
  let show_settings = false;
  let show_celebration = false;
  let time_attack = false;

  const getNewRandomWord = () => {
    random = Math.floor(Math.random() * words[String(guess_length)].length);
  };

  const makeGuess = () => {
    if (guess == "") {
      interactive_debug += 1;
      if (interactive_debug >= 3) {
        DEBUG = !DEBUG;
        interactive_debug = 0;
      }
    }
    if (current_guess > num_guesses - 1 || lost) {
      return;
    }
    if (current_guess >= num_guesses - 1) {
      setTimeout(() => {
        lost = true;
      }, 1500);
    }
    if (guess.length != guess_length) return;
    guesses[current_guess].guess = guess;
    let result = validation(guess, correct_word);
    guesses[current_guess].states = [...result.letter_states];
    // oskb
    if (blind_mode) oskb_states = {};
    for (let i = 0; i < result.letter_states.length; ++i) {
      let letter = guess[i].toLowerCase();
      let state = result.letter_states[i];
      if (state < oskb_states[letter]) continue;
      oskb_states[letter] = state == 0 ? -1 : state;
    }
    b_click();
    current_timer = timer + 1;
    win = result.win;
    if (win) fanfare();
    guess = "";
    current_guess += 1;
    if (win && current_guess == 1) show_celebration = true;
  };

  const initialGuessSetup = (ng) => {
    guesses = Array(num_guesses);
    for (let i = 0; i < guesses.length; i++) {
      let def = {
        guess: Array(guess_length + 1).join(" "),
        states: Array(guess_length).fill(-2), // default state is -2
      };
      guesses[i] = def;
    }
  };

  $: initialGuessSetup(num_guesses);

  // handle on-screen keyboard
  const handleOSKB = (event) => {
    if (lost) return;
    if (guess.length >= guess_length) return;
    let pressed = event.detail.key.toUpperCase();
    guess += pressed;
  };

  const handleOSKB_backspace = (event) => {
    if (guess.length < 1) return;
    guess = guess.slice(0, guess.length - 1);
  };

  $: correct_word = words[String(guess_length)][random].toLowerCase();

  $: {
    if (mount && current_guess < num_guesses) {
      guesses[current_guess].guess =
        guess + Array(guess_length - guess.length + 1).join(" ");
    }
  }

  document.onkeydown = (event) => {
    if (lost) return;
    let key = event.key.toLowerCase();
    let keycode = event.keyCode;
    if (key == "enter") {
      makeGuess();
      return;
    }
    b_click();
    if (key == "backspace") {
      guess = guess.slice(0, guess.length - 1);
      return;
    }
    if (keycode >= 65 && keycode <= 90 && guess.length < guess_length) {
      guess += key.toUpperCase();
    }
  };

  /* runs once when component mounts (inserted into DOM) */
  onMount(() => {
    getNewRandomWord();
    initialGuessSetup();
    mount = true;
  });

  const toggleSettings = () => {
    b_click();
    show_settings = !show_settings;
  };

  const newGame = () => {
    lost = false;
    current_timer = timer;
    initialGuessSetup();
    getNewRandomWord();
    current_guess = 0;
    oskb_states = {};
    win = false;
    show_celebration = false;
  };

  $: guess = win ? "" : guess;

  function newNumberGame(letterNum) {
    show_settings = false;
    if (guess_length == letterNum) return;
    guess_length = letterNum;
    guess = "";
    newGame();
  }
  let timer = -1;
  let current_timer = -1;
  const decrease_timer = () => {
    if (current_guess < 1 || win) return;
    if (lost || !time_attack) return; // already lost!
    if (current_timer < 1) {
      // out of time -- trigger loss
      handle_time_attack_loss();
      return;
    }
    current_timer -= 1; // decrement current timer
  };
  let countdown_interval;
  const play_time_attack = (e) => {
    // dispatched from settings component
    time_attack = e.detail.result;
    timer = e.detail.time;
    current_timer = timer;
    show_settings = false; // hide settings modal on play
    clearInterval(countdown_interval);
    countdown_interval = setInterval(decrease_timer, 1000); // every second, trigger method
  };
  let lost = false;
  const handle_time_attack_loss = () => {
    if (!time_attack) return;
    lost = true;
    guess = "";
  };
  let settings_modal;
  let blind_mode;
</script>

<div class="all" class:do-blur={show_settings || lost}>
  <TopBar {toggleSettings} />
  <main>
    <div class="game">
      <div
        class="entries"
        class:lose-shake={lost}
        class:win-jump={win}
        class:celebration={show_celebration}
        class:loading_background={time_attack}
        style:--loading_background_color={`rgba(${Math.max(
          255 - 255 * (current_timer / timer),
          0
        )},${128 * (current_timer / timer)},0, .486)`}
      >
        <span
          class="timer-fill-bar"
          style={`height: ${
            (Math.max(timer - current_timer, 0) / timer) * 100
          }%`}
        >
          {#each guesses as o}
            <Entry guess={o.guess} states={o.states} {blind_mode} />
          {/each}
        </span>
      </div>
      <span class="below">
        {#if win}
          <WinScreen num_guess={current_guess} on:new-game={newGame} />
        {/if}
        <Keyboard
          on:oskb_click={handleOSKB}
          on:oskb_backspace={handleOSKB_backspace}
          on:oskb_enter={makeGuess}
          states={oskb_states}
          {blind_mode}
        />
      </span>
    </div>
    <!-- end game div -->
    {#if DEBUG}
      <div class="debug">
        <p>Correct Word: {correct_word}</p>
        <button on:click={getNewRandomWord}>Get New Word</button>
        <button on:click={newGame}>reset game</button>
      </div>
    {/if}
  </main>
</div>

{#if lost && !show_settings}
  <NewGameModal {correct_word} on:new-game={newGame} />
{/if}

{#if show_settings}
  <span
    class="settings-modal"
    use:clickOutside
    on:outclick={() => {
      toggleSettings();
    }}
  >
    <Settings
      on:change_diff={(e) => {
        newNumberGame(e.detail.guess_length);
      }}
      {guess_length}
      {time_attack}
      {blind_mode}
      on:toggle_time_attack={(e) => {
        if (time_attack) newGame();
        time_attack = e.detail.result;
      }}
      on:play_time_attack={(e) => {
        newGame();
        play_time_attack(e);
      }}
      on:toggle_blind_mode={() => {
        blind_mode = !blind_mode;
        newGame();
      }}
      bind:this={settings_modal}
    />
  </span>
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
    max-height: 90%;
    height: 100%;
    transition: filter 0.2s ease-in-out;
  }

  .game {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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

  .debug p {
    background-color: rgba(51, 51, 51, 0.376);
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid red;
    border-radius: 5px;
    color: transparent;
    text-overflow: hidden;
  }

  .debug p:before {
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
    display: flex;
    flex-direction: column;
    min-height: 120px;
    margin-top: auto;
    border-radius: 10px;
    /* overflow-y: scroll; */
  }

  .win-jump {
    animation: _win-jump 1s linear infinite;
  }

  @keyframes _win-jump {
    0%,
    100% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(20px);
    }
    75% {
      transform: translateY(10px);
    }
  }

  .lose-shake {
    animation: _lose-shake 1s linear infinite;
  }

  @keyframes _lose-shake {
    0%,
    100% {
      transform: rotateZ(0deg);
    }

    25% {
      transform: rotateZ(3deg);
    }
    50% {
      transform: rotateZ(0deg);
    }
    75% {
      transform: rotateZ(-3deg);
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

  .below {
    margin-top: auto;
  }

  .timer-fill-bar {
    border-radius: 10px;
    background-color: #131516;
    transition: height 1s linear;
    /* animation: _timer-fill-bar 5s linear forwards; */
  }

  .loading_background {
    background-color: var(--loading_background_color);
    transition: background-color 1s linear;
  }
</style>
