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

// Countdown timer.
function countdown() {
  // Maker sure time is not run out.
  if (timerSeconds > 0) {
    timerSeconds--;
  } else if (timerSeconds === 0 && timerMinutes > 0) {
    timerMinutes--;
    timerSeconds = 59;
  } else if (timerSeconds === 0 && timerMinutes === 0) {
    isPlaying = false;
    console.log("----------> Time is over - game stopped <-------------");
    stopCountdown();
  }

  setupTimer();
}

// Resets timer to initial time.
function resetTimer() {
  stopCountdown();
  timerMinutes = initialTimerMinutes;
  timerSeconds = initialTimerSeconds;
  setupTimer();
}

// Starts timer countdown.
function startCountdown() {
  countdownId = setInterval(countdown, 1000);
}

// Stops timer countdown.
function stopCountdown() {
  clearInterval(countdownId);
}
