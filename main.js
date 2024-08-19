const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function placeMark(index, mark) {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  }

  function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  function getBoard() {
    return board;
  }

  return {
    placeMark,
    reset,
    getBoard
  };
})();


const TicTacToe = (() => {
  const player1 = {
    name: 'Player 1',
    mark: 'x',
  }
  
  const player2 = {
    name: 'Player 2',
    mark: 'o',
  }

  let currentPlayer = player1;
  let gameOver = false;

  function makeMove(index) {
    return Gameboard.placeMark(index, currentPlayer.mark)
  }
  
  function resetGame() {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
    updateBoardUI();
    displayMessage(`${currentPlayer.name}'s turn`);
  }

  function checkWin(player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return Gameboard.getBoard()[a] === player && Gameboard.getBoard()[b] === player && Gameboard.getBoard()[c] === player;
    });
  }

  function checkDraw() {
    return Gameboard.getBoard().every(cell => cell !== "");
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function playGame(index) {
    if (gameOver) {
      displayMessage("Game over. Please reset the game.");
      return;
    }

    if (!makeMove(index)) {
      displayMessage("Invalid move. Try again.");
      return;
    }

    updateBoardUI();

    if (checkWin(currentPlayer.mark)) {
      gameOver = true;
      displayMessage(`${currentPlayer.name} wins!`);
    } else if (checkDraw()) {
      gameOver = true;
      displayMessage("It's a draw!");
    } else {
      switchPlayer();
      displayMessage(`${currentPlayer.name}'s turn`);
    }
  }

  function updateBoardUI() {
    document.querySelectorAll('.grid .cell').forEach((cell, i) => {
      cell.innerText = Gameboard.getBoard()[i];
    });
  }

  function displayMessage(message) {
    document.getElementById('message').innerText = message;
    if(message === `${currentPlayer.name} wins!`){
      document.getElementById('message').style.color = 'green'
    } else {
      document.getElementById('message').style.color = 'rgb(92, 92, 92)'
    }
  }

  function changePlayer1Name(name){
    player1.name = name
  }

  function changePlayer2Name(name){
    player2.name = name
  }

  function getCurrentPlayer(){
    return currentPlayer
  }

  return {
    playGame,
    resetGame,
    getCurrentPlayer,
    displayMessage,
    changePlayer1Name,
    changePlayer2Name
  };
})();

TicTacToe.displayMessage(`${TicTacToe.getCurrentPlayer().name}'s turn`)

document.querySelectorAll('.grid .cell').forEach((cell, i) => {
  cell.addEventListener('click', () => {
    TicTacToe.playGame(i);
  });
});

document.getElementById('reset-button').addEventListener('click', () => {
  TicTacToe.resetGame();
});

function updatePlayerName(playerId, inputId) {
  const name = document.getElementById(inputId).value;
  if (name.trim()) {
    playerId === 'player1' ? TicTacToe.changePlayer1Name(name) : TicTacToe.changePlayer2Name(name);
    TicTacToe.displayMessage(`${TicTacToe.getCurrentPlayer().name}'s turn`);
  }
  document.getElementById(inputId).value = '';
}

document.getElementById('player1-btn').addEventListener('click', () => {
  updatePlayerName('player1', 'player1-input');
});

document.getElementById('player2-btn').addEventListener('click', () => {
  updatePlayerName('player2', 'player2-input');
});
