var temp = document.querySelector('.time');
var button = document.querySelector("button");
var words = document.querySelector(".words");
var timerDiv = document.querySelector(".time");
var scoreDiv = document.querySelector(".score");
var points = 0;
var spans;
var typed;
var seconds = 30;
var spark = new Audio("");

function countdown() {
  points = 0;
  var timer = setInterval(function(){
    button.disabled = true;
    seconds--;
    temp.innerHTML = seconds;
    if (seconds === 0) {
      console.log("Game over! Your score is " + points);
      var scoreTextFile = new Blob([points], {type: "text/plain;charset=utf-8"});
      saveAs(scoreTextFile, "typing-game-score.txt");
      words.innerHTML = "";
      button.disabled = false;
      clearInterval(timer);
      seconds = 30;
      timerDiv.innerHTML = "30";
      button.disabled = false;
    }
  }, 1000);
}

function random() {
  words.innerHTML = "";
  var random = Math.floor(Math.random() * (1943 - 0 + 1)) + 0;
  var wordArray = String(random).split("");
  for (var i = 0; i < wordArray.length; i++) {
    var span = document.createElement("span");
    span.classList.add("span");
    span.innerHTML = wordArray[i];
    words.appendChild(span);
  }
  spans = document.querySelectorAll(".span");
}

button.addEventListener("click", function(e){
  countdown();
  random();
  scoreDiv.innerHTML = "0";
  button.disabled = true;
});

document.onkeyup = function(e) {
  if (e.ctrlKey && e.which == 13) {
    countdown();
    random();
    scoreDiv.innerHTML = "0";
    button.disabled = true;
  }
};

function typing(e) {
  typed = String.fromCharCode(e.which);
  for (var i = 0; i < spans.length; i++) {
    if (spans[i].innerHTML === typed) {
      if (spans[i].classList.contains("bg")) {
        continue;
      } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) {
        spans[i].classList.add("bg");
        break;
      }
    }
  }
  var checker = 0;
  for (var j = 0; j < spans.length; j++) {
    if (spans[j].className === "span bg") {
      checker++;
    }
    if (checker === spans.length) {
      spark.pause();
      spark.currentTime = 0;
      spark.play();
      words.classList.add("animated");
      words.classList.add("fadeOutDownBig");
      if (seconds !== 30) {
        points++;
        scoreDiv.innerHTML = points;
        document.removeEventListener("keydown", typing, false);
        setTimeout(function(){
          words.className = "words";
          random();
          document.addEventListener("keydown", typing, false);
        }, 400);
      }
    }

  }
}

document.addEventListener("keydown", typing, false);
