/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,rollingDice,gamePlaying;

init();



function rollDice(){
  if(gamePlaying){
    var dice = Math.floor(Math.random()*6) + 1;
    var dices=[];
    rollingDice.style.display = "block";
    rollingDice.src = "dice-"+dice+".png";
    // add player round score
    if(dice !==1){
      roundScore += dice;
      document.getElementById("current-"+activePlayer).textContent = roundScore;
    } //change player and round score
    else{
      nextPlayer();
    }
  }
}

function holdDice(){
  if(gamePlaying){
    // update score to active player
    scores[activePlayer] += roundScore;
    document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
    // check who won
    if(scores[activePlayer] >=100){
      document.getElementById("name-"+activePlayer).textContent = "Winner";
      document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
      document. querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
      //end game
      gamePlaying=false
    }else{
      // reset score
      nextPlayer();
    }
  }
}

function nextPlayer(){
  activePlayer === 0 ? activePlayer=1 : activePlayer=0;
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function init(){
  scores=[0,0];
  roundScore=0;
  activePlayer=0;
  gamePlaying=true; //declare state of playing game
  rollingDice = document.querySelector(".dice");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  rollingDice.style.display = "none";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//calling function
  // call roll btn
  document.querySelector(".btn-roll").addEventListener("click",rollDice);
  // call hold btn
  document.querySelector(".btn-hold").addEventListener("click",holdDice);
  // call new btn
  document.querySelector(".btn-new").addEventListener("click",init);
