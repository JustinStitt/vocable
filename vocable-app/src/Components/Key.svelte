<script>
  import { createEventDispatcher } from "svelte";
  import { b_click } from "../sounds";
  const dispatch = createEventDispatcher();

  export let key = "a";
  export let state = 0;
  export let width = 1;
  // dispatch to on-screen keyboard dispatcher
  const action = () => {
    b_click();
    dispatch("action", {
      key: key,
    });
  };
</script>

<!-- start HTML -->
<button
  on:click={action}
  class:correct={state == 2}
  class:incorrect={state == 1}
  class:notatall={state == -1}
  disabled={state == 3}
  style={`width: ${width * 3.5}em`}
>
  <h3>
    {key}
  </h3>
</button>

<!-- end HTML -->
<style>
  button {
    height: 3.5em; /* old 33 */
    background-color: rgb(112, 106, 106);
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

  .correct {
    background-color: rgb(38, 207, 151);
  }

  .incorrect {
    background-color: rgb(167, 134, 57);
  }

  .notatall {
    background-color: rgb(133, 127, 127);
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
