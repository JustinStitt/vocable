<script>
  import { fly, fade, slide } from "svelte/transition";
  import { b_click, fanfare } from "../sounds";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let guess_length = 5;
  export let time_attack;
  let ctime_attack = false;
  let time_attack_timer = 30;

  const change_guess = (gl) => {
    b_click();
    dispatch("change_diff", {
      guess_length: gl,
    });
  };

  const toggle_time_attack = () => {
    b_click();
    if (time_attack) {
      ctime_attack = false;
      time_attack = false;
      dispatch("toggle_time_attack", {
        result: false,
      });
      return;
    }
    ctime_attack = !ctime_attack;
    console.log(ctime_attack);
  };

  const play_time_attack = () => {
    dispatch("play_time_attack", {
      time: time_attack_timer,
      result: true,
    });
  };
</script>

<!-- begin HTML -->
<div class="settings" transition:slide>
  <div class="difficulty">
    <h3 style="margin-right: 10px;">Letters:</h3>
    <button
      class="diff-button"
      class:in-use={guess_length == 4}
      on:click={() => change_guess(4)}>4</button
    >
    <button
      class="diff-button"
      class:in-use={guess_length == 5}
      on:click={() => change_guess(5)}>5</button
    >
    <button
      class="diff-button"
      class:in-use={guess_length == 6}
      on:click={() => change_guess(6)}>6</button
    >
  </div>
  <div class="time-attack">
    <h3>Time Attack</h3>
    <button
      class="time-attack-button"
      on:click={toggle_time_attack}
      style:background-color={time_attack || ctime_attack
        ? "rgb(38, 207, 151)"
        : "#333"}
    >
      {time_attack || ctime_attack ? "On" : "Off"}
    </button>
  </div>
  {#if time_attack || ctime_attack}
    <span class="time-attack-slider" transition:slide={{ duration: 250 }}>
      <input
        type="range"
        min="5"
        max="120"
        step="5"
        class="time-slider"
        bind:value={time_attack_timer}
        in:fade
      />
      <output>{time_attack_timer} seconds</output>
      <button
        class="play-time-attack-button"
        on:click={play_time_attack}
        in:fade>Play</button
      >
    </span>
  {/if}
</div>

<!-- end HTML -->
<style>
  button {
    background-color: #333;
    color: aliceblue;
  }
  button:hover {
    transform: scale(1.03);
  }
  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(51, 51, 51, 0.819);
    border: 1px solid aliceblue;
    position: absolute;
    top: 15%;
    border-radius: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    line-height: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 10px;
    padding-left: 10px;
  }

  .difficulty {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .in-use {
    background-color: rgb(38, 207, 151);
    transform: scale(0.9);
  }

  .diff-button:nth-of-type(1) {
    margin-left: auto;
  }

  .diff-button:last-of-type {
    margin-right: auto;
  }

  .diff-button {
    width: 3.5em;
    height: 3.5em;
    border: 1px solid aliceblue;
    color: aliceblue;
  }

  .time-attack-button {
    margin-left: 20px;
    width: 60%;
  }

  .play-time-attack-button {
    margin-top: 10px;
  }

  .time-attack-slider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .time-attack {
    display: flex;
    margin-bottom: 10px;
  }

  .time-slider {
    -webkit-appearance: none;
    height: 15px;
    background-color: #333;
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
