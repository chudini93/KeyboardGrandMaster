window.addEventListener('load', init);

// Globals
let time = 60;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const wpm = document.querySelector('#wpm');
const timeDisplay = document.querySelector('#timer');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'joke'
];

// Initialize Game.
function init(){
    // Load word from array.
    showWord(words);
}

// Pick & show random word
function showWord(words){
    // Generate random array index.
    const randIndex = Math.floor(Math.random() * words.length);

    currentWord.innerHTML = words[randIndex];

    // Output random word.
    // currentWord.innerHTML = shuffle(words);
}

// Randomly sorts array elements.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
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
