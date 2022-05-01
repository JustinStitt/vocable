<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import Key from "./Key.svelte";

  export let states = {};
  export let blind_mode = false;
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  // handle on-screen keyboard dispatch
  const handleOSKB = (event) => {
    dispatch("oskb_click", {
      key: event.detail.key,
    });
  };

  const handleOSKB_backspace = (event) => {
    dispatch("oskb_backspace", {
      key: event.detail.key,
    });
  };

  const handleOSKB_enter = (event) => {
    dispatch("oskb_enter", {
      key: event.detail.key,
    });
  };
</script>

<!-- start HTML -->
<div class="outer">
  {#each rows as row}
    <div class="row">
      {#each row as character}
        <Key
          on:action={handleOSKB}
          key={character.toLowerCase()}
          state={states[character] ? states[character] : 0}
          {blind_mode}
        />
      {/each}
    </div>
  {/each}
  <span class="backspace">
    <Key on:action={handleOSKB_backspace} key="⬅" />
  </span>
  <span class="enter">
    <Key on:action={handleOSKB_enter} key="enter" width={1.5} />
  </span>
</div>

<!-- end HTML -->
<style>
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 3px;
  }

  .outer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .backspace {
    position: absolute;
    transform: translateX(14.77em) translateY(3.6em);
  }

  .enter {
    text-transform: lowercase;
    position: absolute;
    transform: translateX(-15.6em) translateY(3.6em);
  }
</style>
