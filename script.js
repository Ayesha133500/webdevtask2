let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let vsAI = false;

const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const boardEl = document.getElementById('board');
const vsPlayerBtn = document.getElementById('vsPlayer');
const vsAIBtn = document.getElementById('vsAI');

vsPlayerBtn.addEventListener('click', () => {
  vsAI = false;
  resetGame();
});

vsAIBtn.addEventListener('click', () => {
  vsAI = true;
  resetGame();
});

resetBtn.addEventListener('click', resetGame);

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  updateBoard();
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function updateBoard() {
  boardEl.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellEl = document.createElement('div');
    cellEl.classList.add('cell');
    cellEl.textContent = cell;
    cellEl.addEventListener('click', () => handleCellClick(index));
    boardEl.appendChild(cellEl);
  });
}

function handleCellClick(index) {
  if (gameBoard[index] || !gameActive) return;
  
  gameBoard[index] = currentPlayer;
  updateBoard();
  
  if (checkWinner()) {
    statusEl.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkTie()) {
    statusEl.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.textContent = `Player ${currentPlayer}'s turn`;

  if (vsAI && currentPlayer === 'O') {
    aiMove();
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return gameBoard.every(cell => cell !== ''); // If the board is full and no winner, it's a tie
}

function aiMove() {
  const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  setTimeout(() => handleCellClick(randomMove), 500); // AI waits a bit before moving
}

resetGame(); // Initialize the game

