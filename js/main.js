window.addEventListener("load", init);

// Globals
const initialTimerMinutes = 0;
const initialTimerSeconds = 20;
let timerMinutes = initialTimerMinutes;
let timerSeconds = initialTimerSeconds;
let correctKeystrokes = 0;
let incorrectKeystrokes = 0;
let isPlaying;
let timeDisplayFormat = "0:00";
let countdownId;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const wpmDisplay = document.querySelector("#wpm");
const keystrokesDisplay = document.querySelector("#keystrokes");
const timeDisplay = document.querySelector("#timer");
const message = document.querySelector("#message");
const scorePanel = document.querySelector("#score-panel");
const repeatButton = document.querySelector("#repeat");

const words = ["hat", "river", "lucky", "statue", "generate", "joke"];

// Initialize Game.
function init() {
  resetGame();

  // Repeat button functionality.
  repeatButton.addEventListener("click", resetGame);

  // Start matching on word input.
  wordInput.addEventListener("input", startMatch);

  // Check game status.
  setInterval(checkStatus, 50);
}

function resetGame() {
  console.log("----------> Game has been reset <-------------");
  resetTimer();
  resetGlobals();
  isPlaying = false;

  // Load word from array.
  showNewWord(words);
}

function resetGlobals() {
  wordInput.value = "";
  correctKeystrokes = 0;
  incorrectKeystrokes = 0;
  scorePanel.style.visibility = "hidden";
}

// Start match.
function startMatch() {
  if (matchWords(wordInput.value, currentWord.innerHTML)) {
    showNewWord(words);
    wordInput.value = "";
  }
}

// Match currentWord to wordInput.
function matchWords(wordInput, currentWord) {
  if (!isPlaying && wordInput.length > 0) {
    startCountdown();
    isPlaying = true;
  }

  if (isPlaying)
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

// Pick & show random word
function showNewWord(words) {
  // Generate random array index.
  const randIndex = Math.floor(Math.random() * words.length);

  // Output random word.
  currentWord.innerHTML = words[randIndex];

  // Output random word.
  // currentWord.innerHTML = shuffle(words);
}

// Randomly sorts array elements.
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startCountdown() {
  countdownId = setInterval(countdown, 1000);
}

// Countdown timer.
function countdown() {
  // Maker sure time is not run out.
  if (timerSeconds > 0) {
    timerSeconds--;
  } else if (timerSeconds === 0 && timerMinutes > 0) {
    timerMinutes--;
    timerSeconds = 59;
  } else if (timerSeconds === 0 && timerMinutes === 0) {
    // Game is over.
    isPlaying = false;
    console.log("Game over");
  }

  setupTimer();
}

// Set ups timer display.
function setupTimer() {
  timeDisplayFormat = "";
  // Setup displayed format.
  timeDisplayFormat += timerMinutes + ":";
  if (timerSeconds < 10) {
    timeDisplayFormat += "0";
  }
  timeDisplayFormat += timerSeconds;

  timeDisplay.innerHTML = timeDisplayFormat;
}

// Resets timer to initial time.
function resetTimer() {
  // Stop timer.
  clearInterval(countdownId);

  timerMinutes = initialTimerMinutes;
  timerSeconds = initialTimerSeconds;
  setupTimer();
}

// Check game status.
function checkStatus() {
  if (!isPlaying && timerSeconds === 0 && timerMinutes === 0) {
    message.innerHTML = "Game Over!!!";

    // Display score panel.
    scorePanel.style.visibility = "visible";

    wpmDisplay.innerHTML = calculateWPM();
    keystrokesDisplay.innerHTML = calculateKeystrokesInfo();
    wordInput.style.visibility = "hidden";
  }
}

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
