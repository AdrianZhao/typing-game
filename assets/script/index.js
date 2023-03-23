
/*
  OOP JavaScript
  Yuhan Zhao

*/

'use strict';

var temp = document.querySelector('.time');
var button = document.querySelector("button");
var words = document.querySelector(".words");
var timerDiv = document.querySelector(".time");
var scoreDiv = document.querySelector(".score");
var points = 0;
var spans;
var typed;
var seconds = 60;
var spark = new Audio("http://k003.kiwi6.com/hotlink/qdpr7bioht/spark.mp3");

function countdown() {
  points = 0;
  var timer = setInterval(function(){
    button.disabled = true;
      seconds--;
      temp.innerHTML = seconds;
      if (seconds === 0) {
        alert("Game over! Your score is " + points);
        scoreDiv.innerHTML = "0";
        words.innerHTML = "";
        button.disabled = false;
        clearInterval(timer);
        seconds = 60;
        timerDiv.innerHTML = "60";
        button.disabled = false;	
      }
  }, 1000);
  }

  function random() {
    words.innerHTML = "";
    var random = Math.floor(Math.random() * (1943 - 0 + 1)) + 0;
    var wordArray = list[random].split("");
    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
      var span = document.createElement("span");
      span.classList.add("span");
      span.innerHTML = wordArray[i];
      words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
  }


  const list = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
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

  button.addEventListener("click", function(e){
    countdown();
    random();
    button.disabled = true;	
  });


  function typing(e) {
      typed = String.fromCharCode(e.which);
      for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) { // if typed letter is the one from the word
          if (spans[i].classList.contains("bg")) { // if it already has class with the bacground color then check the next one
            continue;
          } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
            spans[i].classList.add("bg");
            break;
          }
        }
      }
      var checker = 0;
      for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
        if (spans[j].className === "span bg") {
          checker++;
        }
        if (checker === spans.length) { // if so, animate the words with animate.css class
          spark.pause();
          spark.currentTime = 0;
          spark.play();
          words.classList.add("animated");
          words.classList.add("fadeOut");
          points++; // increment the points
          scoreDiv.innerHTML = points; //add points to the points div
          document.removeEventListener("keydown", typing, false);
          setTimeout(function(){
            words.className = "words"; // restart the classes
            random(); // give another word
            document.addEventListener("keydown", typing, false);
          }, 400);
        }

      }
  }

  document.addEventListener("keydown", typing, false);