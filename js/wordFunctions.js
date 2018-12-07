const wordsSetup = ["hat", "river", "lucky", "statue", "generate", "joke"];

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
