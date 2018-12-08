// Start comparing input word with current word.
function startComparingWords(userInput, currentWordDOM) {
  var currentWord = currentWordDOM.innerHTML;
  if (userInput.length == currentWord.length && validKeyPressed) {
    if (isWordCorrect(userInput, currentWord)) {
      jumpToNextWord(currentWordDOM);
      clearWordInput();
    } else {
      // Wrong word.
      markCurrentWordAsWrong(currentWord);
    }
  } else {
    if (comparePartialWord(userInput, currentWord)) {
      // Partially right word.
      console.log("Partial words are matching");
    } else {
      // Wrong word
      markCurrentWordAsPartiallyWrong(currentWord);
    }
  }
}

function validKeyPressed(key) {
  var output = key != " " && key != "Backspace";
  return output;
}

// Match currentWord to wordInput.
function isWordCorrect(wordInput, currentWord) {
  if (wordInput === currentWord) {
    message.innerHTML = "Correct";

    // Increase correct Keystrokes by length of current word.
    correctKeystrokes += currentWord.length;
    return true;
  } else {
    message.innerHTML = "Incorrect";
    // TODO: Fix incorrectKeystrokes.
    incorrectKeystrokes++;
    return false;
  }
}

// Compares word that is not yet fully typed.
function comparePartialWord(partialUserInput, currentWord) {
  var output = false;
  var partialCurrentWord = currentWord.substr(0, partialUserInput.length);
  if (partialUserInput == partialCurrentWord) {
    // Part of the words are matching right now.
    // Keystrokes should not be increased since those are just partials.
    output = true;
  }

  return output;
}
