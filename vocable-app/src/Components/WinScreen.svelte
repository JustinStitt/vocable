<script>
  import { fly, fade, slide } from "svelte/transition";
  import { b_click } from "../sounds";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let num_guess;

  const new_game = () => {
    b_click();
    dispatch("new-game", {
      info: "creating new game",
    });
  };
</script>

<!-- begin HTML -->
<div transition:fade>
  <h1>You Won!</h1>
  <h3>Number of Guesses:</h3>
  <h2>{num_guess}</h2>
  <button class="new-game" on:click={new_game}>New Game</button>
</div>

<!-- end HTML -->
<style>
  div {
    color: aliceblue;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    width: 300px;
    border: 1px solid aliceblue;
    border-radius: 5px;
    /* background-color: rgba(51, 51, 51, 0.919); */
    background-color: green;
    padding-bottom: 10px;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  h2 {
    margin-top: 0;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: underline;
  }

  h3 {
    margin-bottom: 0;
  }

  .new-game {
    background-color: rgb(112, 106, 106);
    color: aliceblue;
    border-radius: 5px;
  }
</style>
