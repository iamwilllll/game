// Selects the modal element that contains the cards
const gameModal = document.querySelector('.cards');

/*----------This is temporary code for testing----------*/
// Starts the game immediately when the page loads
startGame();
// Shows the game modal by toggling CSS classes
gameModal.classList.toggle('display-none');
gameModal.classList.toggle('display-flex');
/*----------This is temporary----------*/

// Adds a click event to the "Play" button to open the modal and start the game
document.querySelector('#play').addEventListener('click', () => {
    gameModal.classList.toggle('display-none');
    gameModal.classList.toggle('display-flex');
    startGame();
});

// Main function to initialize and restart the game
function startGame() {
    let num = 3; // Number of cards
    let attempts = 2; // Number of attempts allowed

    const cardsContainer = document.querySelector('.cards__container');
    cardsContainer.innerHTML = ''; // Clears any previous cards

    // Close button logic — add event listener only once
    const closeBtn = document.querySelector('.cards__close');
    if (!closeBtn.dataset.listenerAdded) {
        closeBtn.addEventListener('click', () => {
            gameModal.classList.toggle('display-none');
            gameModal.classList.toggle('display-flex');
        });
        // Marks that the listener has already been added
        closeBtn.dataset.listenerAdded = 'true';
    }

    // Creates the card elements dynamically and inserts them into the container
    for (let i = 0; i < num; i++) {
        cardsContainer.innerHTML += `
            <div class="cards__content">
                <div class="cards__item">
                    <img src="/build/images/webp/card.webp" alt="">
                </div>
                <div class="dot">
                    <img src="/build/images/webp/coin.webp" alt="">     
                </div>
            </div>
        `;
    }

    // Adds event to the "Play Again" button to restart the game
    const playAgainBtn = document.querySelector('#play-again');
    playAgainBtn.addEventListener('click', () => {
        startGame(); // Restarts the game
    });

    // Generates a random number between 1 and the number of cards
    const randomNumber = Math.floor(Math.random() * num) + 1;

    // Adds click events to each card
    document.querySelectorAll('.cards__item').forEach((card, index) => {
        const dot = card.parentElement.querySelector('.dot'); // Gets the coin image
        const clickedNum = index + 1; // Card number starting from 1

        card.addEventListener('click', () => {
            if (attempts) {
                // If there are remaining attempts
                if (clickedNum === randomNumber) {
                    // Correct card selected
                    card.classList.add('active');
                    setTimeout(() => {
                        dot.classList.add('show-dot'); // Reveals the coin
                    }, 500);
                    attempts = 0; // End the game
                } else {
                    // Incorrect card selected
                    card.classList.add('active');
                    --attempts; // Reduce attempts
                }
            }
        });
    });
}
