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
let currentWord;

// DOM Elements
const wordsContainer = getWordsContainer();
const wordInput = document.querySelector("#word-input");
const wpmDisplay = document.querySelector("#wpm");
const keystrokesDisplay = document.querySelector("#keystrokes");
const timeDisplay = document.querySelector("#timer");
const message = document.querySelector("#message");
const scorePanel = document.querySelector("#score-panel");
const repeatButton = document.querySelector("#repeat");

// Initialize Game.
function init() {
  resetGame();

  repeatButton.addEventListener("click", resetGame);

  wordInput.addEventListener("keyup", startGame);

  // Check game status.
  setInterval(checkStatus, 50);
}

// Resets the game to initial state.
function resetGame() {
  console.log("----------> Game has been reset <-------------");
  resetTimer();
  resetGlobals();
  stopGame();
  showWordInput();

  // Load words inside container.
  loadWords();
}

// Starts the game if possible.
function startGame(keyboardEvent) {
  if (userStartedTypingAndGameNotStarted()) {
    console.log("----------> Game has been started <-------------");
    isPlaying = true;
    startCountdown();
  }

  if (isPlaying) {
    startComparingWords(keyboardEvent.key);
  }
}

function userStartedTypingAndGameNotStarted() {
  var output = !isPlaying && wordInput.value.length > 0;
  return output;
}

// Stops the game immediately.
function stopGame() {
  isPlaying = false;
}

// Reset global variables to initial values.
function resetGlobals() {
  clearWordInput();
  correctKeystrokes = 0;
  incorrectKeystrokes = 0;
  scorePanel.style.visibility = "hidden";
}

// Check game status.
function checkStatus() {
  if (isTimeOverAndGameNotPlaying()) {
    hideWordInput();

    // Display score panel.
    scorePanel.style.visibility = "visible";
    message.innerHTML = "Game Over!!!";

    wpmDisplay.innerHTML = calculateWPM();
    keystrokesDisplay.innerHTML = calculateKeystrokesInfo();
  }
}

// Indicates if time is over and game not playing.
function isTimeOverAndGameNotPlaying() {
  var output = isPlaying && timerSeconds === 0 && timerMinutes === 0;
  return output;
}

function reloadCurrentWord() {
  currentWord = document.querySelector(".current-word");
}
