// Selects the modal element that contains the cards
const gameModal = document.querySelector('.cards');
let cardItem;

/* Close game modal button */
document.querySelector('#close-modal').addEventListener('click', () => {
    closeModal(gameModal);
});

document.querySelector('#play-again').addEventListener('click', playAgain);

/* Main function to initialize game */
function startGame() {
    const cardsContainer = document.querySelector('.cards__container');
    let num = 3; // Number of cards
    let attempts = 2; // Number of attempts allowed

    cardsContainer.innerHTML = ''; // Clears any previous cards
    // Creates the card elements dynamically and inserts them into the container
    for (let i = 0; i < num; i++) {
        cardsContainer.innerHTML += `
            <div class="cards__item">
                <div class="card">
                    <div class="card-header">A</div>
                    <div class="card-symbol">♠</div>
                    <div class="card-footer">A</div>
                </div>
                <div class="poker-chip">
                    <img src="/build/images/webp/pocker-chip.webp" alt="poker-chip">
                </div>
            </div>
            `;
    }

    // Generates a random number between 1 and the number of cards
    const randomNumber = Math.floor(Math.random() * num) + 1;

    cardItem = document.querySelectorAll('.cards__item');
    // Adds click events to each card
    cardItem.forEach((card, index) => {
        const dot = card.querySelector('.poker-chip'); // Gets the coin image
        const clickedNum = index + 1; // Card number starting from 1

        card.addEventListener('click', () => {
            if (attempts) {
                // If there are remaining attempts
                if (clickedNum === randomNumber) {
                    // Correct card selected
                    card.classList.toggle('active');
                    card.classList.add('winner');
                    attempts = 0; // End the game
                    showMessage('You win!');

                    setTimeout(() => {
                        dot.classList.toggle('show-poker-chip'); // Reveals the coin
                    }, 500);
                } else {
                    card.classList.toggle('active'); // Incorrect card selected
                    if (card.classList.contains('active')) {
                        --attempts; //Remove an attempt when you fail
                        // ---------------------mostrar

                        setTimeout(() => {
                            cardItem.forEach(card => {
                                card.classList.remove('active');
                            });
                        }, 2500);
                    }
                }
                if (!document.querySelector('.winner') && attempts === 0) {
                    showMessage('You lost!');
                }

                showRemainingAttempts(attempts);
            }
        });
    });
    showRemainingAttempts(attempts);
}
function showRemainingAttempts(value) {
    const remainingAttempts = document.querySelector('#attempts');
    remainingAttempts.textContent = value;
}

function showMessage(text) {
    const menssage = document.querySelector('.cards__message');
    menssage.textContent = text;
    menssage.classList.toggle('display-none');
    menssage.classList.toggle('display-flex');

    setTimeout(() => {
        menssage.classList.toggle('display-none');
        menssage.classList.toggle('display-flex');
        playAgain();
    }, 5000);
}

/* Main function to play again */
function playAgain() {
    cardItem.forEach(card => {
        const dot = card.querySelector('.poker-chip');
        dot.classList.remove('show-poker-chip');

        setTimeout(() => {
            card.classList.remove('active');
            card.classList.remove('winner');

            setTimeout(() => {
                startGame();
            }, 100);
        }, 500);
    });
}

/* Main function to close modal */
function closeModal(item) {
    item.classList.toggle('display-none');
    item.classList.toggle('display-flex');
}

/*----------This is temporary code for testing----------*/
/* open modal buton */
document.querySelector('#play').addEventListener('click', () => {
    gameModal.classList.toggle('display-none');
    gameModal.classList.toggle('display-flex');
    startGame();
    //start game
});
