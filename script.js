// Número de cartas que se desean crear
let num = 3;

//generar las cartas mediante JS
for (let i = 0; i < num; i++) {
    document.querySelector('#game-container').innerHTML += `
    <div class="card-container">
        <div class="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24">
                <path fill="#1c2833" d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3 13c-.6 0-1.1-.3-1.5-.7l1 2.7h-3l1-2.7c-.4.4-.9.7-1.5.7c-1.1 0-2-.9-2-2s.9-2 2-2h.3c-.2-.3-.3-.7-.3-1c0-1.1.9-2 2-2s2 .9 2 2c0 .4-.1.7-.3 1h.3c1.1 0 2 .9 2 2s-.9 2-2 2" />
            </svg>
        </div>
        <div class="dot"></div>
    </div>
    `;
}

// Generar un número aleatorio entre 1 y 3
const randomNumber = Math.floor(Math.random() * 4) + 1;

// Definir el número de intentos permitidos
let attempts = 2;

// Acceder a todas las cartas y recorrerlas con el DOM
document.querySelectorAll('.card').forEach((card, index) => {
    // Obtener el punto oculto asociado a la carta
    const dot = card.parentElement.querySelector('.dot');
    // Establecer el número de carta visible (comienza en 1)
    const clickedNum = index + 1;
    // Agregar un evento al hacer clic sobre la carta
    card.addEventListener('click', () => {
        // Verificar si aún quedan intentos disponibles
        if (attempts) {
            // Si el número de la carta coincide con el número ganador
            if (clickedNum === randomNumber) {
                // Mostrar el contenido oculto de la carta
                card.classList.add('active');
                // Mostrar el punto después de 0.5 segundos para que no colisione con la carta
                setTimeout(() => {
                    dot.classList.add('show-dot');
                }, 500);
                // Eliminar todos los intentos restantes (se ganó el juego)
                attempts = 0;
            } else {
                // Si se falla, mostrar que debajo de la carta no hay nada
                card.classList.toggle('reveal');
                // Restar un intento
                --attempts;
            }
        } else {
            // Si ya no quedan intentos, se podría mostrar un mensaje aquí
            // Ejemplo: alert('¡Se acabaron los intentos!');
        }
    });
});
