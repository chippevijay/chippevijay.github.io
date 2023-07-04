const cells = Array.from(document.getElementsByClassName('cell'));
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function makeMove(cellIndex) {
  if (!gameActive) return;

  const cell = cells[cellIndex];
  if (cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    displayResult(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (checkDraw()) {
    displayResult('It\'s a draw!');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function checkDraw() {
  return cells.every(cell => {
    return cell.textContent !== '';
  });
}

function displayResult(message) {
  const result = document.createElement('p');
  result.textContent = message;
  document.body.appendChild(result);
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  currentPlayer = 'X';
  gameActive = true;
  const result = document.querySelector('p');
  if (result) {
    result.remove();
  }
}
