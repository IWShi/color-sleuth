var round = 1;
var difference = 30;
var different = null;
var playerTurn = 1;
var oneScore = 0;
var twoScore = 0;
var cont = false;

function numGenerator(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "inline-block";
  playGame();
}

function playGame() {
  if (round > 10) {
    endGame();
  } else {
    document.getElementById("accuracy").innerHTML = "";
    document.getElementById("center").style.display = "inline-block";
    document.getElementById("roundNum").innerHTML = "Round " + round.toString();
    var one = document.getElementById("playerOne");
    var two = document.getElementById("playerTwo");

    if (playerTurn == 1) {
      document.getElementById("oneTurn").style.display = "initial";
      document.getElementById("twoTurn").style.display = "none";
      one.style.border = "5px solid red";
      one.style.backgroundColor = "rgb(250, 170, 170)";
      two.style.border = "5px solid black";
      two.style.backgroundColor = "rgb(255, 255, 255)";
    } else {
      document.getElementById("twoTurn").style.display = "initial";
      document.getElementById("oneTurn").style.display = "none";
      two.style.border = "5px solid red";
      two.style.backgroundColor = "rgb(250, 170, 170)";
      one.style.border = "5px solid black";
      one.style.backgroundColor = "rgb(255, 255, 255)";
    }

    different = numGenerator(1, 9).toString();
    var color = "rgb(";
    var diffColor = "rgb(";

    for (i = 0; i < 3; i++) {
      var value = numGenerator(0, 255);
      color = color + value.toString() + ",";
      if (value - difference < 0) {
        value += difference;
      } else if (value + difference > 255) {
        value -= difference;
      } else {
        if (Math.random() >= 0.5) {
          value += difference;
        } else {
          value -= difference;
        }
      }
      diffColor = diffColor + value.toString() + ",";
    }
    color = color.slice(0, -1) + ")";
    diffColor = diffColor.slice(0, -1) + ")";
    for (i = 1; i <= 9; i++) {
      document.getElementById(i.toString()).style.backgroundColor = color;
    }
    document.getElementById(different).style.backgroundColor = diffColor;
  }
}

function testTile(tileNum) {
  if (cont == false) {
    if (tileNum == Number(different)) {
      if (playerTurn == 1) {
        oneScore++;
        document.getElementById("oneScore").innerHTML = "Score: " + oneScore.toString();
      } else {
        twoScore++;
        document.getElementById("twoScore").innerHTML = "Score: " + twoScore.toString();
      }
      document.getElementById("accuracy").innerHTML = "PLAYER " + playerTurn.toString() + " IS CORRECT";
    } else {
      document.getElementById("accuracy").innerHTML = "PLAYER " + playerTurn.toString() + " IS INCORRECT";
    }
    for (i = 1; i <= 9; i++) {
      document.getElementById(i.toString()).style.opacity = 0.2;
    }
    document.getElementById(different).style.opacity = 1;
    if (playerTurn == 1) {
      playerTurn = 2;
    } else {
      playerTurn = 1;
      round++;
      difference -= 3;
    }
    cont = true;
  } else {
    cont = false;
    for (i = 1; i <= 9; i++) {
      document.getElementById(i.toString()).style.opacity = 1;
    }
    playGame();
  }
}

function endGame() {
  document.getElementById("roundNum").innerHTML = "End of Game";
  document.getElementById("accuracy").innerHTML = "";
  document.getElementById("center").style.display = "none";
  document.getElementById("gameOver").style.display = "inline-block";
  document.getElementById("twoTurn").style.display = "none";
  document.getElementById("playerTwo").style.border = "5px solid black";
  document.getElementById("playerTwo").style.backgroundColor = "rgb(255, 255, 255)";
  var winner = document.getElementById("winner");
  if (oneScore > twoScore) {
    winner.innerHTML = "PLAYER 1 WINS";
  } else if (oneScore < twoScore) {
    winner.innerHTML = "PLAYER 2 WINS";
  } else {
    winner.innerHTML = "TIE";
  }
}

function retry() {
  round = 1;
  difference = 30;
  different = null;
  playerTurn = 1;
  oneScore = 0;
  twoScore = 0;
  cont = false;
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("oneScore").innerHTML = "Score: " + oneScore.toString();
  document.getElementById("twoScore").innerHTML = "Score: " + twoScore.toString();
  playGame();
}
