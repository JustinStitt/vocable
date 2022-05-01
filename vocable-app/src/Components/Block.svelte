<script>
  import { onMount } from "svelte";

  export let letter = "0";
  export let state = -2;
  export let anim_delay = 0.0;
  export let blind_mode = false;

  let shown_state = -3;

  let changed = false;

  const isChanged = (_) => {
    if (state == -2 && shown_state == -3) return;
    changed = true;
    if (state < shown_state) {
      shown_state = state;
      changed = false;
    } else setTimeout(setShowState, anim_delay * 1000 + 250);
  };

  const setShowState = () => {
    shown_state = state;
  };

  let do_pop = false;

  const doPop = (letter) => {
    if (letter.length < 1) return;
    do_pop = true;
    setTimeout(() => (do_pop = false), 200);
  };

  $: doPop(letter);

  $: isChanged(state);

  let color = "#434a5d21"; // idle color
  $: changeColorOnState(shown_state);
  const changeColorOnState = (s) => {
    switch (shown_state) {
      case 1:
        color = "rgb(167, 134, 57)";
        break;
      case 2:
        color = "rgb(38, 207, 151)";
        break;
    }
    if (blind_mode) {
      setTimeout(() => {
        color = "#434a5d21";
      }, 5100);
    }
  };
</script>

<!-- start HTML -->
<div
  class:doflip={changed}
  class:pop={do_pop}
  style="animation-delay: {do_pop ? 0 : anim_delay}s; --bground-color: {color};
  transition: background-color {blind_mode ? '1.5s' : '0'} linear"
>
  <h3>
    {letter}
  </h3>
</div>

<!-- end HTML -->
<style>
  div {
    width: 75px; /*old 45*/
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background-color: var(--bground-color); /*#434a5d21*/
    border: 1px solid rgb(178, 181, 184);
    margin-left: 2px;
  }

  div h3 {
    color: aliceblue;
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    padding-bottom: 5px;
  }

  .doflip {
    animation: flip 1s;
    transition-timing-function: cubic-bezier();
  }

  @keyframes flip {
    0% {
      transform: rotateX(0) scale(1, 1);
    }
    100% {
      transform: rotateX(180deg) scale(1, -1);
    }
  }

  .pop {
    animation: _pop 0.2s linear;
  }

  @keyframes _pop {
    0% {
      transform: scale(1) rotateX(0);
    }
    50% {
      transform: scale(1.2) rotateX(4deg);
    }
    100% {
      transform: scale(1) rotateX(0);
    }
  }
</style>
