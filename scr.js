const boardElement = document.getElementById("board");
const resultElement = document.getElementById("result");
const resetButton = document.getElementById("reset");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.id.split('-')[1]);

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.backgroundColor = currentPlayer === 'X' ? 'lightgreen' : 'black';

    checkResult();
    
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            aiPlay();
        }
    }
}

function aiPlay() {
    let emptyCells = board.map((cell, index) => (cell === '') ? index : null).filter(cell => cell !== null);
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiCellIndex = emptyCells[randomIndex];
    
    board[aiCellIndex] = currentPlayer;
    const cellElement = document.getElementById(`cell-${aiCellIndex}`);
    cellElement.textContent = currentPlayer;
    cellElement.style.backgroundColor = 'red';

    checkResult();
    
    if (gameActive) {
        currentPlayer = 'X';
    }
}

function checkResult() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            resultElement.textContent = `${board[a]} wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        resultElement.textContent = "It's a draw!";
        gameActive = false;
    }
}

resetButton.addEventListener('click', resetGame);
boardElement.addEventListener('click', handleCellClick);

function resetGame() {
    board.fill('');
    gameActive = true;
    currentPlayer = 'X';
    resultElement.textContent = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = '';
        cell.style.backgroundColor = 'blueviolet';
    }
}
