<script>
    import Block from './Block.svelte'

    export let entry_size = 5;
    export let guess = '';
    export let states = [];

    const animation_speed = 6;
</script>

<!-- start HTML -->
    <div>
        {#each Array(guess.length) as _, i}
        <Block letter={guess[i]} state={states[i]} anim_delay={0.0+i/animation_speed}/>
        {/each}
    </div>
<!-- end HTML -->

<style>
    div {
        display: flex;
        flex-direction: row;
        padding-top: 2px;
    }

</style>