document.addEventListener("keydown", disableF5RefreshPage);

// Disable F5 from refreshing page - resetGame() instead.
function disableF5RefreshPage(event) {
  switch (event.keyCode) {
    case 116: // 'F5'
      event.preventDefault();
      event.keyCode = 0;
      window.status = "F5 disabled";
      resetGame();
      break;
  }
}
