function markCurrentWordAsPartiallyWrong(currentWord) {
  currentWord.className = "partially-wrong";
}

function markCurrentWordAsWrong(currentWord) {
  currentWord.className = "wrong";
}

function jumpToNextWord(currentWordDOM) {
  var nextId = parseInt(currentWordDOM.id) + 1;
  var nextWord = document.getElementById(nextId);
  nextWord.className = "current-word";
  currentWordDOM.className = "success";
  reloadCurrentWord();

  // Scroll word container if needed.
  if (getOffset(currentWordDOM).left > getOffset(nextWord).left) {
    wordsContainer.style.top = (nextId / 10) * -37 + "px";
  }
}

// Pick & show random word
function loadWords() {
  clearWordsContainerFirst();
  var randomWords = shuffle(basicEnglishWords);
  generateWordsInsideContainer(randomWords);
  reloadCurrentWord();
}

function generateWordsInsideContainer(words) {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    generateSpanInWordContainer(i, i == 0 ? "current-word" : "", word);
  }
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

function getWordsContainer() {
  var output = document.getElementById("words-container");

  // Remove dummy element which was created only because without that div wouldn't exist.
  var dummySpan = document.getElementById("dummy");
  dummySpan.parentNode.removeChild(dummySpan);

  return output;
}

// Generates span inside wordContainer.
function generateSpanInWordContainer(id, className, text) {
  var newSpan = document.createElement("span");
  newSpan.id = id;
  newSpan.className = className;
  newSpan.innerHTML = text;
  wordsContainer.appendChild(newSpan);
}

// Clear words container before any span are included, to remove duplicates.
function clearWordsContainerFirst() {
  wordsContainer.innerHTML = "";

  // Reset position of words Container.
  wordsContainer.style.top = "0px";
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
