
/*
  OOP JavaScript
  Yuhan Zhao

*/

'use strict';

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

/* const time = select('.time');
const hitCount = select('.hit-count')
const play = select('.play');
const input = select('.user-input');
const word = select('.word');
const uScore = select('.your-score')
const lead = select('.leaderboard');
const stats = select('.stats-grid');
const exit = select('.exit');
const instructions = select('.instructions');
const arrows = selectAll('.arrow');
*/
const word = select('.word');
const inputWord = select('.type-word');
const time = select('.time');
const hit = select('.hit')
const btn = select('.btn');
const play = select('.play');
const input = select('.input');
const icon = select('.icon');
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
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


let i = 0;
let hits = 0;
let seconds = 100;
input.value = '';
input.disabled = true;

function getRandomWord(word) {
  i++;
  word.split('').forEach(character => {
    const characterSpan = create('span');
    characterSpan.innerText = character;
    word.append(characterSpan);
  });
}
function displayTime() {
  time.innerText = `${seconds.toString().padStart(2, 0)}s`;
  console.log(time.innerText);
  seconds--;
  if(seconds >= 0) {
    setTimeout(function() {
      displayTime()
    }, 10);
  }
  if(seconds < 0) {
    endGame();
  }
}
function start() {
  words.sort(() => (Math.random() > 0.5) ? 1 : -1);
  setTimeout(() => {
    seconds = 99;
    getRandomWord(words[i]);
    input.disabled = false;
    input.focus();
    displayTime();
  }, 1000);
}
function endGame() {
  play.innerText = 'Play Again';
  seconds = 0;
  i = 0;
  hits = 0;
  hit.innerText = '00';
  input.disabled = true;
  word.innerText = '';
  input.value = '';
}
onEvent('click', btn, function() {
  start();
})
onEvent('input', input, function() {
  const wordSpan = word.getElementsByTagName("span");
  const inputValue = input.value.toLowerCase().trim().split('');
  wordSpan.forEach((characterSpan, index) => {
    const character = inputValue[index];
    if (character != characterSpan.innerText) {
      incorrect.play();
      icon.classList.add('shake');
      setTimeout(() => {
        icon.classList.remove('shake');
      }, 500);
      input.style.backgroundColor = 'red';
      setTimeout(() => {
      incorrect.pause();
      incorrect.currentTime = 0;
      }, 500)
    }
  })
})
input.onkeyup = function() {
  const wordSpan = word.getElementsByTagName("span");
  const inputValue = input.value.toLowerCase().trim().split('');
  wordSpan.forEach((characterSpan, index) => {
    const character = inputValue[index];
    if (input.value.join('') === word.innerText) {
      input.style.backgroundColor = '#060231';
      hits++;
      icon.classList.add('move');
      setTimeout(() => {
        icon.classList.remove('move');
      }, 500);
      hit.innerText = `${hits.toString().padStart(2, '0')}`;
      word.innerText = getRandomWord(words[i]);
      input.value = '';
    } else if (input.value.trim().length < word.innerText.length) {
      if (character != characterSpan.innerText) {
        icon.classList.add('shake');
        characterSpan.classList.add('incorrect');
        characterSpan.classList.remove('correct');
        setTimeout(() => {
          icon.classList.remove('shake');
        }, 500);
        input.style.backgroundColor = 'red';
        setTimeout(() => {
        }, 500)
        document.onkeydown = () => false;
        index--;
      } else if (character === characterSpan.innerText) {
        document.onkeydown = () => true;
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
      }
    }
  })
}
/* let bug = false;

input.value = '';
input.disabled = true;

function getRandomWord() {
  index++;
  return words[index - 1];
}

function displayTime() {
  time.innerText = `${seconds.toString().padStart(2, 0)}s`;
  // console.log(time.innerText)
  seconds--;
  if(seconds >= 0) {
    setTimeout(function() {
      displayTime()
    }, 10);
  }
  if(seconds < 0) {
    endGame();
  }
}

function leaderBoard(n, h, d, p) {
  lead.innerHTML += `<p>
      <span class="place">#${n}</span>
      <span class="hits-display">${h.toString().padStart(2, '0')}</span>/90
      <span class="date">${d}</span>
      <span class="percent">${p}</span>
    </p>`
}

function createScore() {
  let score = {};
  lead.innerHTML = '';
  score.date = new Date().toDateString().slice(3).trim(' ')
  score.hits = hits;
  uScore.innerHTML = `
    <p>You Typed</p>
    <h3>${score.hits}</h3>
    <p>Words</p>`
  uScore.style.visibility = 'visible';
  uScore.style.opacity = '1';
  score.percentage = `${(Math.round(hits / 90 * 10_000) / 100).toFixed(2).toString().padStart(5, '0')}%`;
  stats.style.visibility = 'visible';
  stats.style.opacity = '1';
  scores.push(score);
  scores.sort((a, b) => (a.hits > b.hits) ? -1 : 1);
  if (scores.length < 10) {
    for (let i = 0; i < scores.length; i++) {
      leaderBoard(i + 1, scores[i].hits, scores[i].date, scores[i].percentage);
    }
  } else {
    for (let i = 0; i < 9; i++) {
      leaderBoard(i + 1, scores[i].hits, scores[i].date, scores[i].percentage);
    }
  }
  setTimeout(() => {
    uScore.style.opacity = '0';
    setTimeout(() => {
      uScore.style.visibility = 'hidden';
      uScore.style.display = 'none';
      lead.style.visibility = 'visible';
      lead.style.opacity = '1';
    }, 250);
  }, 1_000);

  localStorage.setItem('scores', JSON.stringify(scores));
}

function start() {
  play.disabled = true;
  if (play.innerText === 'Play' || play.innerText === 'Play Again') {
    words.sort(() => (Math.random() > .5) ? 1 : -1);
    countdown.play()
    setTimeout(() => {
      seconds = 99;
      play.disabled = false;
      word.innerText = getRandomWord();
      input.disabled = false;
      input.focus()
      displayTime();
      backgroundMusic.play()
      play.innerText = 'End Game';
    }, 2_500);
  } else {
    endGame()
    bug = true;
  }
}

function endGame() {
  play.innerText = 'Play Again';
  seconds = 0;
  index = 0;
  createScore();
  input.disabled = true;
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0;
  gameOver.play();
  play.disabled = false;
  word.innerText = '';
  input.value = '';
  hits = 0;
  hitCount.innerText = '00';
  instructions.innerText = '';
}

onEvent('click', play, function() {
  start();
})

input.onkeyup = function() {
  if (input.value.toLowerCase().trim() === word.innerText) {
    input.style.backgroundColor = '#060231';
    ++hits;
    arrows.forEach(arrow => arrow.classList.add('spin'));
    setTimeout(() => {
      arrows.forEach(arrow => arrow.classList.remove('spin'));
    }, 200)
    hitCount.innerText = `${hits.toString().padStart(2, '0')}`;
    word.innerText = randomWord();
    input.value = '';
    correct.play();
  } else if (input.value.trim().length >= word.innerText.length) {
    incorrect.play()
    input.style.backgroundColor = 'var(--app-red)';
    setTimeout(() => {
      incorrect.pause();
      incorrect.currentTime = 0;
    }, 300)
  }
  if (hits === words.length || seconds < 0) {
    bug = true;
    start()
  }
}

onEvent('click', exit, () => {
  stats.style.opacity = '0';
  lead.style.opacity = '0';
  setTimeout(() => {
    stats.style.visibility = 'hidden';
    lead.style.display = 'none'
  }, 250)
})
*/