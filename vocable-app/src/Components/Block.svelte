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
    border: 2px solid rgb(137, 130, 146);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background-color: #434a5d21;
    max-width: 75px;
    min-width: 20px;
    border: 1px solid #333;
    margin-left: 2px;
}

div h3 {
    font-size: 35px;
    font-weight: 400;
    text-align: center;
    padding-bottom: 5px;
}

.correct {
    background-color: rgb(38, 207, 151);
}

.incorrect {
    background-color: rgb(235, 195, 103);
}
</style>
