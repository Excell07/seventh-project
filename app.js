const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letters = document.getElementsByClassName('letter');
const showedLetters = document.getElementsByClassName('show');
let missed = 0; // count wrong guesses
let tries = document.getElementsByClassName('tries');
let missedTries = 4; // index of an element within the array
const keyboard = qwerty.getElementsByTagName("BUTTON");

const resetGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phrases = ["Great things never came from comfort zones", "Just do it", "stay curious", "Hello world", "purpose is what creates true happiness"];
const ul = document.querySelector('#phrase ul');

const randPhrase = getRandomPhraseAsArray(phrases);

// display the game screen
resetGame.addEventListener('click', (e) => {
  const targetElm = e.target.textContent === "New Game";
  if (e.target.textContent === "Start Game"){
    overlay.style.display = 'none';
    overlay.removeAttribute("class");
    addPhraseToDisplay(randPhrase);
  }
  if (checkWin() || !checkWin() && targetElm){
    newGame();      
  }
});

// randomly choose a phrase from array
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase;
}


// set the game display using an Array object
function addPhraseToDisplay(arr) {

  const list = Array.from(arr);
  for (let i = 0; i < list.length; i += 1) {
    const item = document.createElement('li');
    item.textContent = list[i];
    ul.appendChild(item);
    if (item.textContent !== " "){
      item.className = "letter";
    } else {
      item.className = "space";
    }    
  }
}

// check if guessed letter is in the phrase
function checkLetter(btnGuess){

  let letterFound = null;
  const btnGuessed = btnGuess.textContent.toLowerCase();

  if (btnGuess.tagName === 'BUTTON'){
      btnGuess.setAttribute("disabled", "");
    }
  for (let i = 0; i < letters.length; i += 1){
    const smallLetter = letters[i].textContent.toLowerCase();

    if (btnGuessed === smallLetter){
      letters[i].classList.add("show", "shrink");
      letterFound = letters[i].textContent; 
      btnGuess.classList.add('chosen');
    }
  }

  let lostHeart = tries[missedTries];   
    if (letterFound === null){
      missed += 1;
        lostHeart.firstElementChild.src = "images/lostHeart.png";
      missedTries -= 1;
    }
}

const title = document.querySelector(".title");


function newGame(){

  // reset game
  overlay.style.display = "none";
  missedTries = 4;
  missed = 0;

  const letters = document.querySelectorAll('.letter');
  for (let i = 0; i < letters.length; i += 1){
      letters[i].classList.remove("show", "shrink");
      for (let i = 0; i < keyboard.length; i += 1){
        if (keyboard[i].tagName === 'BUTTON'){
          keyboard[i].removeAttribute("disabled");
        }

        if (keyboard[i].className === 'chosen'){
          keyboard[i].removeAttribute("class");
        }
      }
    }
    // loop through lives
  for (let i = 0; i < tries.length; i++) {
    tries[i].firstElementChild.src = "images/liveHeart.png";
  }
  while (ul.firstChild){
    ul.removeChild(ul.firstChild);
  }

  const newRandPhrase = Math.floor(Math.random() * phrases.length);       
  addPhraseToDisplay(phrases[newRandPhrase]);
  
}

function checkWin(){
  
  let gameWon = null;
  let correctGuess = letters.length === showedLetters.length;

    if (missed === 5){
      declareWinner("You lose!", "lose");

    } else if (correctGuess){
      declareWinner("You win!", "win");
      gameWon = correctGuess;
      return gameWon;
    }
}

function declareWinner(who, className){
  overlay.removeAttribute("style");
  overlay.className = className;
  title.textContent = who;
  resetGame.textContent = "New Game";
}

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == "BUTTON") {
    let btn = e.target;
    checkLetter(btn);
    checkWin();
  }
});