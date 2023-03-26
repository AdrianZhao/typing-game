
/*
  OOP JavaScript
  Yuhan Zhao

*/

'use strict';

class Score {
  #date;
  #hits;
  constructor(date = new Date().toDateString(), hits) {
    this.date = date;
    this.hits = hits;
  }
  set date(date) {
    this.#date = date;
  }
  set hits(hits) {
    this.#hits = hits;
  }
  get date() {
    return this.#date;
  }
  get hits() {
    return this.#hits;
  }
}

function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function select (selector, parent = document) {
  return parent.querySelector(selector);
}
function selectAll (selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
function print(arg) {
  console.log(arg);
}

function create(element, parent = document) {
  return parent.createElement(element);
}

const inputWord = select('.type-word');
const time = select('.time');
const hit = select('.hit')
const btn = select('.btn');
const play = select('.play');
const input = select('.input');
const icon = select('.icon');
const scoreDisplay = select('.score-board');
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

const backgroundMusic = new Audio('./assets/audio/background.mp3');
backgroundMusic.volume = 0.5;

const score = new Score();

let i = 0;
let hits = 0;
let seconds = 100;
input.value = '';
input.disabled = true;

function getRandomWord(letter) {
  i++;
  inputWord.innerHTML = '';
  letter.split('').forEach(character => {
    const characterSpan = create('span');
    characterSpan.innerText = character;
    inputWord.appendChild(characterSpan);
  });
}
function displayTime() {
  time.innerText = `${seconds.toString().padStart(2, 0)}s`;
  seconds--;
  if(seconds >= 0) {
    setTimeout(function() {
      displayTime()
    }, 1000);
  }
  if(seconds < 0) {
    endGame();
  }
}
function start() {
  btn.disabled = false;
  words.sort(() => (Math.random() > 0.5) ? 1 : -1);
  setTimeout(() => {
    backgroundMusic.play();
    seconds = 99;
    getRandomWord(words[i]);
    input.disabled = false;
    input.focus();
    displayTime();
    play.innerText = 'END GAME';
  }, 1000);
}
function endGame() {
  getScore();
  play.innerText = 'PLAY AGAIN';
  seconds = 0;
  i = 0;
  hits = 0;
  hit.innerText = '00';
  input.disabled = true;
  inputWord.innerHTML = '';
  input.value = '';
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0;
}
onEvent('click', btn, function() {
  if (play.innerText === 'PLAY NOW' || play.innerText === 'PLAY AGAIN') {
    btn.disabled = true;
    play.innerText = 'READY';
    scoreDisplay.innerText = '';
    score.hits = 0;
    countDown(4);
  } else {
    endGame();
  }
})
function countDown(timeleft) {
  return new Promise((resolve, reject) => {
    let countdownTimer = setInterval(() => {
      timeleft--;
      inputWord.textContent = timeleft;
      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        resolve(true);
        start();
      }
    }, 1000);
  });
}
input.onkeyup = function() {
  console.log(input.value);
  const wordSpan = inputWord.querySelectorAll('span');
  const inputValue = input.value.toLowerCase().trim().split('');
  const tempInputValue = '';
  wordSpan.forEach((characterSpan, index) => {
    const character = inputValue[index];
    if (character === null){
      characterSpan.classList.remove('incorrect');
      characterSpan.classList.remove('correct');
    } else if (input.value.toLowerCase().trim() === inputWord.innerText) {
      hits++;
      icon.classList.add('move-icon');
      setTimeout(() => {
        icon.classList.remove('move-icon');
      }, 1000);
      hit.innerText = `${hits.toString().padStart(2, '0')}`;
      getRandomWord(words[i]);
      input.value = '';
      score.hits = hits;
    } else {
      if (character != characterSpan.innerText) {
        characterSpan.classList.add('incorrect');
        characterSpan.classList.remove('correct');
        icon.classList.add('shake-icon');
        setTimeout(() => {
          icon.classList.remove('shake-icon');
        }, 500);
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
      }
    }
  })
}
function getScore() {
  scoreDisplay.innerText = `Today is: ${score.date}\nYour score is: ${score.hits}`
}