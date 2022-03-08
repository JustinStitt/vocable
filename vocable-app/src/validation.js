function validation(guess, correct) {
    guess = guess.toLowerCase();
    correct = correct.toLowerCase();
    /*
        states:
        0: letter not in correct string
        1: letter in correct string but not right spot
        2: letter in correct string and right spot
    */
    const NOT_FOUND = 0;
    const INCORRECT_SPOT = 1;
    const CORRECT_SPOT = 2;

    const result = {
        win: false,
        letter_states: [],
    };
    if (guess == correct) result.win = true;

    let states = Array(guess.length).fill(NOT_FOUND)
    for(let i = 0; i < guess.length; ++i) {
        let letter = guess[i];
        let f_index = correct.search(letter);
        if (f_index == -1) continue;
        if (guess[i] == correct[i]) states[i] = CORRECT_SPOT;
        else if (f_index != i) states[i] = INCORRECT_SPOT;
    }

    result.letter_states = [...states] // create copy of states just in case of pointer magic
    return result;
}

export default validation;