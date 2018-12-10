let lineNumber = 1;

function resetLineNumber() {
  lineNumber = 1;
}

function markAsWrong(domElement) {
  domElement.className = "letter wrong";
}

function markAsSuccess(domElement) {
  domElement.className = "letter success";
}

function jumpBackToPreviousLetter(currentLetterDOM) {
  var previousLetterDOM = currentLetterDOM.previousSibling;
  if (previousLetterDOM == null) {
    let previousWord = currentLetterDOM.parentNode.previousSibling;
    if (previousWord != null) {
      previousLetterDOM = previousWord.lastChild;
    }
  }

  if (previousLetterDOM != null) {
    currentLetterDOM.className = "letter";
    previousLetterDOM.className = "letter current";
  } else {
    // TODO: Not possible to back to previous letter - it does not exists.
  }
}

function jumpToNextLetter(currentLetterDOM) {
  var nextLetterDOM = currentLetterDOM.nextSibling;
  if (nextLetterDOM == null) {
    nextLetterDOM = currentLetterDOM.parentNode.nextSibling.firstChild;
  }
  nextLetterDOM.className = "letter current";

  // Scroll word container if needed.
  if (getOffset(currentLetterDOM).left > getOffset(nextLetterDOM).left) {
    wordsContainerDOM.style.transform = `translateY(${lineNumber * -36}px)`;
    lineNumber++;
  }
}

// Pick & show random word
function loadWords() {
  clearWordsContainerFirst();
  var randomWords = shuffle(basicEnglishWords);
  generateWordsInsideContainer(randomWords);
  reloadCurrentLetter();
}

function generateWordsInsideContainer(words) {
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];

    const wordDOM = generateDivInParent(
      `word${wordIndex}`,
      "word",
      null,
      wordsContainerDOM
    );

    for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
      let letter = word[letterIndex];
      if (letter === " ") {
        letter = "&nbsp;";
      }
      let className =
        wordIndex === 0 && letterIndex === 0 ? "letter current" : "letter";
      generateDivInParent(`letter${letterIndex}`, className, letter, wordDOM);
    }
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
  var dummyDiv = document.getElementById("dummy");
  dummyDiv.parentNode.removeChild(dummyDiv);

  return output;
}

// Generates div inside parent container.
function generateDivInParent(id, className, text, parentDOM) {
  var newDiv = document.createElement("div");
  newDiv.id = id;
  newDiv.className = className;
  if (text !== null) {
    newDiv.innerHTML = text;
  }
  parentDOM.appendChild(newDiv);

  return newDiv;
}

// Clear words container before any div are included, to remove duplicates.
function clearWordsContainerFirst() {
  wordsContainerDOM.innerHTML = "";

  // Reset position of words Container.
  wordsContainerDOM.style.transform = `translateY(0px)`;
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
