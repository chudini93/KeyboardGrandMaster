// Calculates Words Per Minute.
function calculateWPM() {
  var output = 0;

  // Indicates for how much characters one word equals.
  // Commonly is known as 5.
  var oneWordLength = 5;

  // Because we are counting words per minute.
  var oneMinuteMultiplier =
    60 / (initialTimerMinutes * 60 + initialTimerSeconds);

  var wpm = (correctKeystrokes / oneWordLength) * oneMinuteMultiplier;
  output = Math.round(wpm);

  return output;
}

function calculateKeystrokesInfo() {
  var output = `Keystrokes (correct:${correctKeystrokes} | incorrect: ${incorrectKeystrokes} | all: ${correctKeystrokes +
    incorrectKeystrokes})`;

  return output;
}
