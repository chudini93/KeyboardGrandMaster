// Start comparing input word with current word.
function startComparingWords(keyPressed) {
  var userInput = wordInput.value;
  var currWord = currentWord.innerHTML;

  if (userInput.length == currWord.length && validKeyPressed) {
    if (compareWords(userInput, currWord)) {
      // TODO: Go to next word.
      // Mark success class to current word.
      showNewWord(words);
      clearWordInput();
    } else {
      // Wrong word.
      // TODO: Mark wrong class to current word.
    }
  } else {
    if (comparePartialWord(userInput, currWord)) {
      // Right word, indicate yellow for now!
      console.log("Partial words are matching");
    } else {
      // Wrong word
      // TODO: Mark wrong class to current word.
    }
  }
}

function validKeyPressed(key) {
  var output = key != " " && key != "Backspace";
  return output;
}

// Match currentWord to wordInput.
function compareWords(wordInput, currentWord) {
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
