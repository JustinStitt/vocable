function validation(guess, correct) {
    guess = guess.toLowerCase();
    correct = correct.toLowerCase();

    let counts = {}
    for (let i = 0; i < correct.length; ++i) {
        let letter = correct[i].toLowerCase();
        if (counts[letter]) counts[letter]++;
        else counts[letter] = 1;
    }

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
        if (guess[i] == correct[i]) {
            states[i] = CORRECT_SPOT;
            counts[letter]--;
        }
    }

    for(let i = 0; i < guess.length; ++i) {
        let letter = guess[i];
        let f_index = correct.search(letter);
        if (f_index == -1) continue;
        else if (f_index != i && counts[letter] > 0) {
            counts[letter]--;
            states[i] = INCORRECT_SPOT;
        }
    }

    result.letter_states = [...states] // create copy of states just in case of pointer magic
    return result;
}

export default validation;