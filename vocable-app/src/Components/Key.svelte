<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    export let key = 'a';
    export let state = 0;

    // dispatch to on-screen keyboard dispatcher
    const action = () => {
        dispatch('action', {
            'key': key,
        })
    }

</script>

<!-- start HTML -->
<button on:click={action} class:correct={state==2} class:incorrect={state==1} class:notatall={state==-1}
    disabled={state==3}
>
    <h3>
        {key}
    </h3>
</button>
<!-- end HTML -->

<style>
    button {
        height: 30px;
        width: 30px;
        background-color: rgb(112, 106, 106);
        border: 1px solid #333;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 3px;
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
        filter: opacity(.25);
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
