// Variables to keep track of scores
let player1Score = 0;
let player2Score = 0;

// Elements for displaying results
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const gameResultElement = document.getElementById('game-result');
const animatedResultElement = document.getElementById('animated-result');
const Play1 = document.getElementById('play1');
const Play2 = document.getElementById('play2');

Swal.fire({
    title: 'Enter Player 1 Name',
    input: 'text',
    inputPlaceholder: 'Player 1 Name',
    showCancelButton: true,
    confirmButtonText: 'Set Name',
    cancelButtonText: 'Cancel',
    preConfirm: (name) => {
        // Check if the user entered a name
        if (!name) {
            Swal.showValidationMessage('You need to enter a name!');
            return false;
        }
        return name; // Return the entered name
    }
}).then((result) => {
    if (result.isConfirmed) {
        // If user confirms, update Player 1's name in the textContent
        Play1.textContent = `${result.value}`;
    }
})
    .then(() => {

        Swal.fire({
            title: 'Enter Player 2 Name',
            input: 'text',
            inputPlaceholder: 'Player 2 Name',
            showCancelButton: true,
            confirmButtonText: 'Set Name',
            cancelButtonText: 'Cancel',
            preConfirm: (name) => {
                // Check if the user entered a name
                if (!name) {
                    Swal.showValidationMessage('You need to enter a name!');
                    return false;
                }
                return name; // Return the entered name
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms, update Player 1's name in the textContent
                Play2.textContent = `${result.value}`;
            }
        });
    })

// Buttons for player choices
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

// Variables to store player choices
let player1Choice = '';
let player2Choice = '';

// Add event listeners to buttons
rockButton.addEventListener('click', () => makeChoice('rock'));
paperButton.addEventListener('click', () => makeChoice('paper'));
scissorsButton.addEventListener('click', () => makeChoice('scissors'));

// Function to make a choice for player 1 and player 2
function makeChoice(choice) {
    if (!player1Choice) {
        player1Choice = choice;
        gameResultElement.textContent = `${Play1.textContent} chose ${choice}. Now ${Play2.textContent}, make your choice.`;
    } else if (!player2Choice) {
        player2Choice = choice;
        gameResultElement.textContent = `${Play2.textContent} chose ${choice}. Checking the result...`;
        determineWinner();
    }
}

// Function to determine the winner
function determineWinner() {
    if (player1Choice === player2Choice) {
        gameResultElement.textContent = `It's a tie! Both chose ${player1Choice}.`;
    } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'paper' && player2Choice === 'rock') ||
        (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
        gameResultElement.textContent = `${Play1.textContent} wins! ${player1Choice} beats ${player2Choice}.`;
        player1Score++;
        player1ScoreElement.textContent = player1Score;
    } else {
        gameResultElement.textContent = `${Play2.textContent} wins! ${player2Choice} beats ${player1Choice}.`;
        player2Score++;
        player2ScoreElement.textContent = player2Score;
    }

    // Trigger the animation result
    animateResult();

    // Reset the choices for the next round
    player1Choice = '';
    player2Choice = '';
}

// Function to animate result text
function animateResult() {
    animatedResultElement.textContent = gameResultElement.textContent;
    animatedResultElement.classList.add('show');
    setTimeout(() => {
        animatedResultElement.classList.remove('show');
    }, 2000);
}
