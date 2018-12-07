// Disable F5 from refreshing page - resetGame() instead.
function my_onkeydown_handler(event) {
  switch (event.keyCode) {
    case 116: // 'F5'
      event.preventDefault();
      event.keyCode = 0;
      window.status = "F5 disabled";
      resetGame();
      break;
  }
}
document.addEventListener("keydown", my_onkeydown_handler);
