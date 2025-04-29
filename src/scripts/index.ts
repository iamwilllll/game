// game.ts
// =====================
// Select modal and buttons
const gameModal = document.querySelector<HTMLElement>('.cards');
const closeModalButton = document.getElementById('close-modal');
const playAgainButton = document.getElementById('play-again');
const playButton = document.getElementById('play');

// Message and attempts display
const messageEl = document.querySelector<HTMLElement>('.cards__message');
const attemptsEl = document.getElementById('attempts');

// Game state
let cardItems: NodeListOf<HTMLElement>;
let randomNumber = 0;
let attemptsLeft = 0;

// Attach modal toggle and control listeners
closeModalButton?.addEventListener('click', toggleModal);
playButton?.addEventListener('click', () => {
    toggleModal();
    startGame(3, 2);
});
playAgainButton?.addEventListener('click', resetGame);

// Toggle modal visibility
function toggleModal(): void {
    gameModal?.classList.toggle('hidden-modal');
    gameModal?.classList.toggle('center-modal');
}

// Initialize the game with a given number of cards and attempts
function startGame(numCards = 3, maxAttempts = 2): void {
    const container = document.querySelector<HTMLElement>('.cards__container');
    if (!container) return;

    // Reset container and state
    container.innerHTML = '';
    randomNumber = Math.floor(Math.random() * numCards) + 1;
    attemptsLeft = maxAttempts;

    // Render cards
    for (let i = 1; i <= numCards; i++) {
        container.innerHTML += `
        <div class="cards__item">
            <div class="card">
                <div class="card-header">A</div>
                <div class="card-symbol">♠</div>
                <div class="card-footer">A</div>
            </div>
            <div class="poker-chip"><img src="/build/images/webp/pocker-chip.webp" alt="poker-chip"></div>
        </div>
    `;
    }

    // Query items and bind click handlers
    cardItems = container.querySelectorAll<HTMLElement>('.cards__item');
    cardItems.forEach((card, idx) => {
        card.addEventListener('click', () => handleCardClick(card, idx + 1));
    });

    updateAttemptsDisplay();
}

// Handle card click logic
function handleCardClick(card: HTMLElement, id: number): void {
    if (attemptsLeft <= 0) return;
    const chip = card.querySelector<HTMLElement>('.poker-chip');

    if (id === randomNumber) {
        card.classList.add('active', 'winner');
        setTimeout(() => chip?.classList.add('show-poker-chip'), 500);
        showMessage('You win!');
        attemptsLeft = 0;
    } else {
        card.classList.add('active');
        attemptsLeft--;
        setTimeout(() => {
            cardItems.forEach(c => c.classList.remove('active'));
        }, 2500);

        if (attemptsLeft === 0 && !document.querySelector('.winner')) {
            showMessage('You lost!');
        }
    }

    updateAttemptsDisplay();
}

// Display remaining attempts
function updateAttemptsDisplay(): void {
    if (attemptsEl) attemptsEl.textContent = attemptsLeft.toString();
}

// Show temporary message then reset
function showMessage(text: string): void {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.classList.remove('display-none');
    messageEl.classList.add('display-flex');

    setTimeout(() => {
        messageEl.classList.add('display-none');
        messageEl.classList.remove('display-flex');
        resetGame();
    }, 5000);
}

// Reset cards and restart game
function resetGame(): void {
    if (!cardItems) return;
    cardItems.forEach(card => {
        const chip = card.querySelector<HTMLElement>('.poker-chip');
        card.classList.remove('active', 'winner');
        chip?.classList.remove('show-poker-chip');
    });
    setTimeout(() => startGame(), 500);
}
