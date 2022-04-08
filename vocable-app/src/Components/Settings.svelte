<script>
	import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    export let guess_length = 5;

    const change_guess = (gl) => {
        //b_click(); 
        dispatch('change_diff', {
            'guess_length': gl,
        })
    }
</script>

<!-- begin HTML -->
<div class='difficulty' in:fade out:fade>
    <h3>Letters: </h3>
    <button class:in-use={guess_length==4} class='diff-button' on:click={() => change_guess(4)}>4</button>
    <button class:in-use={guess_length==5} class='diff-button' on:click={() => change_guess(5)}>5</button>
    <button class:in-use={guess_length==6} class='diff-button' on:click={() => change_guess(6)}>6</button>
</div>
<!-- end HTML -->

<style>
    .difficulty {
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        top: 15%;
        text-align: center;
        width: 20%;
        background-color: rgba(51, 51, 51, 0.819);
        border: 1px solid aliceblue;
        border-radius: 10px;
        padding-bottom: 10px;
        line-height: 100%;
    }

    .in-use {
        background-color: rgb(38, 207, 151);
    }   
    
	.diff-button {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid aliceblue;
	}
</style>