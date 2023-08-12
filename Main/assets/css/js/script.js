// 1. Variable Declarations
const startButton = document.querySelector('.start-button');
const timerElement = document.querySelector('.timer-count');
const wordBlankElement = document.querySelector('.word-blanks');
const secondsRem = document.querySelector('#sec-rem');
const winsCountElement = document.querySelector('.win');
const lossesCountElement = document.querySelector('.lose');
const resetButton = document.querySelector('.reset-button');

let gameStarted = false;
let wins = 0;
let losses = 0;
let timeLeft = 10;
let timerInterval;

// 2. Function Definitions

function startTimer() {
  //This checks if the game has NOT started yet using the ! (logical NOT) operator.
  if (!gameStarted) {
    //This line sets the gameStarted variable to true, indicating the game is now in progress.
    gameStarted = true;
    //These function calls will refresh the displayed wins and losses count, ensuring that they're up to date when the game starts.
    updateWinsCount();
    updateLossesCount();
    //This line disables the start button so that the user can't start the game again while it's already in progress.
    startButton.disabled = true;
    //This function call resets game-related elements to their default state, ensuring the game starts fresh.
    resetGameElements();

    //This sets up an interval that runs the provided function every 1000 milliseconds (or 1 second). It continues to run at this interval until it's cleared.
    timerInterval = setInterval(() => {
      //This checks if there's still time left. If so, the game continues.
      if (timeLeft > 0) {
        updateTimerDisplay();
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        //This line checks if the word displayed isn't "JavaScript".
        if (wordBlankElement.textContent.replace(/\s/g, '') !== 'JavaScript') {
          //These lines update the UI to show "Word Not Guessed!", hide the "seconds remaining" message, increment the losses by 1, and then update the displayed losses count.
          timerElement.textContent = 'Word Not Guessed!';
          secondsRem.style.display = 'none';
          losses++;
          updateLossesCount();
        } else {
          timerElement.textContent = 'Time is up'; // Or you can remove this if not needed
        }
        //after handling the end-game scenarios (word guessed or not), the game is reset to its initial state for another round.
        resetGame();
      }
    }, 1000);
  }
}

function resetScores() {
  wins = 0;
  losses = 0;
  updateWinsCount();
  updateLossesCount();
}

function resetGame() {
  setTimeout(() => {
    // Introduce a delay before resetting
    startButton.disabled = false;
    gameStarted = false;
    timeLeft = 10;
    resetGameElements();
  }, 2000); // 2 seconds delay
}

function resetGameElements() {
  updateTimerDisplay();
  wordBlankElement.textContent = 'J _ v _ S c r_ _t';
  secondsRem.style.display = 'block';
}

function updateTimerDisplay() {
  let seconds = timeLeft;
  timerElement.textContent = `00:${seconds}`;
}

function updateWinsCount() {
  winsCountElement.textContent = wins;
}

function updateLossesCount() {
  lossesCountElement.textContent = losses;
}

// 3. Event Listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetScores);

document.addEventListener('keydown', (event) => {
  if (gameStarted && event.key.match(/^[a-z]$/)) {
    wordBlankElement.textContent = wordBlankElement.textContent.replace(
      '_',
      event.key
    );
    // Check if the word is fully guessed
    if (wordBlankElement.textContent.replace(/\s/g, '') === 'JavaScript') {
      clearInterval(timerInterval); // Stop the timer
      timerElement.textContent = 'Word Guessed!'; // Display the "Word Guessed!" message
      secondsRem.style.display = 'none';
      // wordBlankElement.textContent = '';

      wins++;
      updateWinsCount();
      resetGame();
    }
  }
});
