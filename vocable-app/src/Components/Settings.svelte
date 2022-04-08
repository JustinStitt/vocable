<script>
  import { fly, fade } from "svelte/transition";
  import { b_click, fanfare } from "../sounds";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let guess_length = 5;

  const change_guess = (gl) => {
    b_click();
    dispatch("change_diff", {
      guess_length: gl,
    });
  };
</script>

<!-- begin HTML -->
<div class="settings" in:fade out:fade>
  <div class="difficulty">
    <h3>Letters:</h3>
    <button
      class:in-use={guess_length == 4}
      class="diff-button"
      on:click={() => change_guess(4)}>4</button
    >
    <button
      class:in-use={guess_length == 5}
      class="diff-button"
      on:click={() => change_guess(5)}>5</button
    >
    <button
      class:in-use={guess_length == 6}
      class="diff-button"
      on:click={() => change_guess(6)}>6</button
    >
  </div>
  <div class="time-attack">
    <h3>Time Attack</h3>
    <input type="range" min="5" max="120" class="time-slider" />
  </div>
</div>

<!-- end HTML -->
<style>
  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(51, 51, 51, 0.819);
    border: 1px solid aliceblue;
    position: absolute;
    top: 15%;
    text-align: center;
    width: 20%;
    border-radius: 10px;
    padding-bottom: 10px;
    line-height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .difficulty {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .in-use {
    background-color: rgb(38, 207, 151);
  }

  .diff-button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid aliceblue;
  }

  .time-slider {
    -webkit-appearance: none;
    height: 15px;
  }

  .time-slider::webkit-slider-thumb {
    -webkit-appearance: none;
    height: 25px;
    border-radius: 50%;
  }

  .time-slider::moz-range-thumb {
    height: 25px;
    border-radius: 50%;
  }
</style>
