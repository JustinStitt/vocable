<script>
  import { createEventDispatcher } from "svelte";
  import { b_click } from "../sounds";
  const dispatch = createEventDispatcher();

  export let key = "a";
  export let state = 0;
  export let width = 1;
  export let blind_mode = false;
  let show_blind_mode = false;
  // dispatch to on-screen keyboard dispatcher
  const action = () => {
    b_click();
    dispatch("action", {
      key: key,
    });
  };
  //let color = "rgb(38, 207, 151);"; // default color
  let color = "rgb(112, 106, 106)";
  $: changeColorOnState(state);
  const changeColorOnState = (s) => {
    switch (s) {
      case 0:
        color = "rgb(112, 106, 106)";
        break;
      case 1:
        color = "rgb(167, 134, 57)"; // incorrect
        break;
      case 2:
        color = "rgb(38, 207, 151)";
        break;
      case -1:
        color = "rgb(42, 42, 42)"; // not at all
        break;
    }
    if (blind_mode && state != 0) {
      setTimeout(() => {
        state = 0;
        color = "rgb(112, 106, 106)";
      }, 5000);
    }
  };
  $: show_blind_mode = blind_mode && state != 0;
</script>

<!-- start HTML -->
<button
  on:click={action}
  class:notatall={state == -1 && !blind_mode}
  disabled={state == 3}
  style="--bground-color: {color}; width: {width * 3.5}em"
>
  <h3>
    {key}
  </h3>
</button>

<!-- end HTML -->
<style>
  button {
    height: 3.5em; /* old 33 */
    background-color: var(--bground-color);
    border: 2px solid #333;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
    -webkit-transition: 0.5s -webkit-filter linear;
    -moz-transition: 0.5s -moz-filter linear;
    -moz-transition: 0.5s filter linear;
    -ms-transition: 0.5s -ms-filter linear;
    -o-transition: 0.5s -o-filter linear;
    transition: 0.5s filter linear, 0.5s -webkit-filter linear,
      background-color 0.5s linear;
    filter: opacity(1);
  }

  button:disabled {
    pointer-events: none;
  }

  button:active {
    background-color: rgb(117, 112, 112);
  }

  h3 {
    font-size: 15px;
    color: rgb(194, 228, 255);
    text-transform: uppercase;
    padding-bottom: 3px;
  }

  .notatall {
    filter: opacity(0.25);
  }

  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
        supported by Chrome, Edge, Opera and Firefox */
  }
</style>
