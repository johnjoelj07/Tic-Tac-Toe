const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const modal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

playAgainBtn.addEventListener('click', resetGame);

function handleCellClick(cell, index) {
    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;

    const winCombo = checkWinner();

    if (winCombo) {
        winCombo.forEach(i => cells[i].classList.add('win'));
        showModal(`🎉 Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        showModal("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    for (let combination of winningCombinations) {
        if (combination.every(index => 
            cells[index].textContent === currentPlayer
        )) {
            return combination;
        }
    }
    return null;
}

function showModal(message) {
    resultText.textContent = message;
    modal.style.display = "flex";
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('win');
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    modal.style.display = "none";
}
