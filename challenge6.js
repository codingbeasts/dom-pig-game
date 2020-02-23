/*
  Coding challenge 6
  1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
  (Hint: always save the previous dice roll in a separate variable)

  2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined
  score of 100. (Hint: you can read that value with the .value property in Javascript. This is good opportunity to use google-fu)

  3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
  (Hint: you will need CSS to position the second dice, so take a look at CSS code for the first one)
*/


/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,rollingDice,gamePlaying,lastdice,finalScore;

init();



function rollDice(){
  if(gamePlaying){
    var dice = Math.floor(Math.random()*6) + 1;
    rollingDice.style.display = "block";
    rollingDice.src = "dice-"+dice+".png";
    // add player round score
    if(lastdice ===6 && dice ===6){
      scores[activePlayer]=0;
      document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    }
    else if(dice !==1){
      roundScore += dice;
      document.getElementById("current-"+activePlayer).textContent = roundScore;
    } //change player and round score
    else{
      nextPlayer();
    }
    lastdice=dice;
  }
}

function holdDice(){
  if(gamePlaying){
    // update score to active player
    scores[activePlayer] += roundScore;
    document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
    // check who won
    finalScore = document.querySelector(".wining-score").value;
    if(finalScore.length <= 0)
    {
      finalScore = 100;
    }
    if(scores[activePlayer] >=finalScore){
      document.getElementById("name-"+activePlayer).textContent = "Winner";
      document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
      document. querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
      document.querySelector(".wining-score").value="";
      document.querySelector(".wining-score").disabled=true;
      //end game
      gamePlaying=false;
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
  document.querySelector(".wining-score").value="";
  document.querySelector(".wining-score").disabled=false;
}

//calling function
  // call roll btn
  document.querySelector(".btn-roll").addEventListener("click",rollDice);
  // call hold btn
  document.querySelector(".btn-hold").addEventListener("click",holdDice);
  // call new btn
  document.querySelector(".btn-new").addEventListener("click",init);
