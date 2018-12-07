// Start comparing input word with current word.
function startComparingWords() {
  if (compareWords(wordInput.value, currentWord.innerHTML)) {
    showNewWord(words);
    clearWordInput();
  }
}

// Match currentWord to wordInput.
function compareWords(wordInput, currentWord) {
  if (wordInput === currentWord) {
    message.innerHTML = "Correct";

    // Increase correct Keystrokes by length of current word.
    correctKeystrokes += currentWord.length;
    console.log("Typed: ", correctKeystrokes);
    return true;
  } else {
    message.innerHTML = "Incorrect";
    // TODO: Fix incorrectKeystrokes.
    incorrectKeystrokes++;
    console.log("incorrects: ", incorrectKeystrokes);
    return false;
  }
}
