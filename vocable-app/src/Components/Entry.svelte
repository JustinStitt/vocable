<script>
    import Block from './Block.svelte'

    export let entry_size = 5;
    export let guess = '';
    export let states = [];
</script>

<!-- start HTML -->
<div>
    {#each Array(guess.length) as _, i}
        <Block letter={guess[i]} state={states[i]}/>
    {/each}
</div>
<!-- end HTML -->

<style>
    div {
        width: 25%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 2px;
        min-width: 200px;
    }

</style>