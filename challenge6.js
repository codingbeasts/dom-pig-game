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

var scores,roundScore,activePlayer,rollingDice1,rollingDice2,gamePlaying,lastdice1,lastdice2,finalScore;

init();



function rollDice(){
  if(gamePlaying){
    var dice1 = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;

    rollingDice1.style.display = "block";
    rollingDice2.style.display = "block";

    rollingDice1.src = "dice-"+dice1+".png";
    rollingDice2.src = "dice-"+dice2+".png";
    // add player round score
    if(lastdice1 ===6 && dice1 ===6 && lastdice2 ===6 && dice2===6){
      scores[activePlayer]=0;
      document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    }
    else if(lastdice1 ===6 && dice1 ===6 || lastdice2 ===6 && dice2===6){
      scores[activePlayer]=0;
      document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    }
    else if(dice1 !==1 && dice2 !==1){
      roundScore += dice1+dice2;
      document.getElementById("current-"+activePlayer).textContent = roundScore;
    } //change player and round score
    else{
      nextPlayer();
    }
    lastdice1=dice1;
    lastdice2=dice2;
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
      document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
      document.querySelector(".wining-score").value="";
      document.querySelector(".wining-score").disabled=true;
      removeDices();
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
  rollingDice1 = document.querySelector(".dice1");
  rollingDice2 = document.querySelector(".dice2");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  removeDices();
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".wining-score").value="";
  document.querySelector(".wining-score").disabled=false;
  lastdice1=0;
  lastdice2=0;
}

function removeDices(){
  rollingDice1.style.display = "none";
  rollingDice2.style.display = "none";
}

//calling function
  // call roll btn
  document.querySelector(".btn-roll").addEventListener("click",rollDice);
  // call hold btn
  document.querySelector(".btn-hold").addEventListener("click",holdDice);
  // call new btn
  document.querySelector(".btn-new").addEventListener("click",init);
