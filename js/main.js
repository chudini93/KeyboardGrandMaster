window.addEventListener("load", init);

// Globals
const initialTimerMinutes = 0;
const initialTimerSeconds = 20;
let timerMinutes = initialTimerMinutes;
let timerSeconds = initialTimerSeconds;
let correctKeystrokes = 0;
let incorrectKeystrokes = 0;
let isPlaying;
let notStarted = true;
let timeDisplayFormat = "0:00";
let countdownId;
let userInput = "";

// DOM Elements
let currentWordDOM;
const wordsContainer = getWordsContainer();
const wpmDisplay = document.querySelector("#wpm");
const keystrokesDisplay = document.querySelector("#keystrokes");
const timeDisplay = document.querySelector("#timer");
const message = document.querySelector("#message");
const scorePanel = document.querySelector("#score-panel");
const repeatButtonDOM = document.querySelector("#repeat");

// Initialize Game.
function init() {
  resetGame();

  repeatButtonDOM.addEventListener("click", resetGame);
  document.addEventListener("keyup", startGame);
  // Check game status.
  setInterval(checkStatus, 50);
}

// Resets the game to initial state.
function resetGame() {
  console.log("----------> Game has been reset <-------------");
  resetTimer();
  resetGlobals();
  stopGame();

  // Load words inside container.
  loadWords();
}

function addKeyIfValid(event, userInput) {
  var output = userInput;
  var allowedChars = [",", ".", ";", "-", " ", "'", "?", "!", "+", "/", "*"];
  //A-Z 0-9
  if (
    (event.keyCode <= 90 && event.keyCode >= 48) ||
    allowedChars.indexOf(event.key) > -1
  ) {
    output += event.key;

    console.log("KeyPressed: ", event.key);
  }

  if (event.key === "Backspace") {
    output = userInput.substr(0, userInput.length - 1);
  }

  return output;
}

// Starts the game if possible.
function startGame(keyboardEvent) {
  if (notStarted) {
    userInput = addKeyIfValid(keyboardEvent, userInput);
    console.log("UserInput: ", userInput);
  }

  if (userStartedTypingAndGameNotStarted(userInput)) {
    console.log("----------> Game has been started <-------------");
    isPlaying = true;
    startCountdown();
  }

  if (isPlaying) {
    startComparingWords(userInput, currentWordDOM);
  }
}

function userStartedTypingAndGameNotStarted(userInput) {
  var output = !isPlaying && userInput.length > 0 && notStarted;
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
  notStarted = true;
}

// Check game status.
function checkStatus() {
  if (isTimeOverAndGameNotPlaying()) {
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
  currentWordDOM = document.querySelector(".current-word");
}
