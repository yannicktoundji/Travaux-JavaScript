'use strict';

// Selecting Éléments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winModal = document.querySelector('.winner');

//Switching player function
const swithPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

//Initialisation
const init = function () {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  winModal.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
};

const hold = function () {
  if (playing) {
    //1. Addiding the current score to the global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check score is 100 at list
    if (scores[activePlayer] >= 20) {
      //3. Finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      winModal.classList.remove('hidden');
      playing = false;
    } else {
      //4. Switch to the next player
      swithPlayer();
    }
  }
};

const rolling = function () {
  if (playing) {
    //1. Generatin a random dice roll
    const dice = Math.trunc(6 * Math.random() + 1);
    //console.log(dice);

    //2.Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1 if true,
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      swithPlayer();
    }
  }
};

// Initialisation
init();
// Rolling dice functionality
btnRoll.addEventListener('click', rolling);

//Holding the score
btnHold.addEventListener('click', hold);

// New event
btnNew.addEventListener('click', init);

