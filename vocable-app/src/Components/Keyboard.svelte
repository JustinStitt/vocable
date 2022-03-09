<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
    import Key from './Key.svelte'

    export let states = {};
    const rows = ['qwertyuiop',
                  'asdfghjkl',
                  'zxcvbnm'];


	// handle on-screen keyboard dispatch
    const handleOSKB = (event) => {
        dispatch('oskb_click', {
            'key': event.detail.key,
        })
    }

    const handleOSKB_backspace = (event) => {
        dispatch('oskb_backspace', {
            'key': event.detail.key,
        })
    }
</script>

<!-- start HTML -->
<div class='outer'>
    {#each rows as row}
        <div class='row'>
            {#each row as character}
                <Key on:action={handleOSKB} key={character.toLowerCase()} 
                    state={states[character] ? states[character] : 0}/>
            {/each}
        </div>
    {/each}
    <span class='backspace'>
        <Key on:action={handleOSKB_backspace} key='⬅'/>
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
        transform: translateX(132px) translateY(32px);
    }
</style>
