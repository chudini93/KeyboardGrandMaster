// Start comparing user input key with current letter.
function startComparingLetters(userInput, currentLetterDOM) {
  var currentLetter = currentLetterDOM.innerHTML;
  console.log(`current: ${currentLetter} input: ${userInput}`);
  if (validKeyPressed(userInput)) {
    if (isLetterCorrect(userInput, currentLetter)) {
      markAsSuccess(currentLetterDOM);
      jumpToNextLetter(currentLetterDOM);
      clearWordInput();
    } else {
      // Wrong word.
      markAsWrong(currentLetterDOM);
      jumpToNextLetter(currentLetterDOM);
    }
  } else {
    jumpBackToPreviousLetter(currentLetterDOM);
  }
}

function validKeyPressed(key) {
  var output = key != "Backspace";
  return output;
}

// Compare currentLetter to userInput.
function isLetterCorrect(userInput, currentLetter) {
  if (userInput === currentLetter) {
    message.innerHTML = "Correct";

    correctKeystrokes++;
    return true;
  } else {
    message.innerHTML = "Incorrect";
    incorrectKeystrokes++;
    return false;
  }
}
