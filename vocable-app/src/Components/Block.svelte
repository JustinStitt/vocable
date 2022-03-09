<script>
export let letter = '0'
export let state = 0;

</script>

<!-- start HTML -->
<div class:correct={state==2} class:incorrect={state==1}>
    <h3>
        {letter}
    </h3>
</div>
<!-- end HTML -->

<style>
div {
    width: 45px;
    height: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background-color: #434a5d21;
    max-width: 75px;
    min-width: 50px;
    border: 1px solid rgb(178, 181, 184);
    margin-left: 2px;
}

div h3 {
    color: aliceblue;
    font-size: 35px;
    font-weight: 400;
    text-align: center;
    padding-bottom: 5px;
}

.correct {
    background-color: rgb(38, 207, 151);
}

.incorrect {
    background-color: rgb(167, 134, 57);
}
</style>
