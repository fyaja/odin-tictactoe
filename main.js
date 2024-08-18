// todo to create tic tac toe

/*
1. an array to play
2. player x and o
3. x goes first and set the turn
4. player can choose the grid that they want
5. create winning condition
6. always check if there's player that fill the winning condition
7. player that fills the winning condition is win and player that doesn't lose
8. if there is no player that fill the winning condition then its draw
*/

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
    Gameboard.reset()
    currentPlayer = player1;
    gameOver = false;
    console.log("Game reset")
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

  function changePlayer1Name(name){
    player1.name = name
  }

  function changePlayer2Name(name){
    player2.name = name
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function playGame(index) {
    if (gameOver) {
      console.log("Game over. Please reset the game.");
      return;
    }

    if (!makeMove(index)) {
      console.log("Invalid move. Try again.");
      return;
    }

    console.log(Gameboard.getBoard());

    if (checkWin(currentPlayer.mark)) {
      console.log(`${currentPlayer.name} wins!`);
      gameOver = true;
    } else if (checkDraw()) {
      console.log("It's a draw!");
      gameOver = true;
    } else {
      switchPlayer();
    }
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  return {
    playGame,
    resetGame,
    getCurrentPlayer,
    changePlayer1Name,
    changePlayer2Name
  };
})()