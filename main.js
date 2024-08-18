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

function createTicTacToe() {
  let grid = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "x";
  let gameOver = false;

  function makeMove(index) {
    return grid[index] === "" ? grid[index] = currentPlayer : false
  }
  
  function resetGame() {
    grid = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "x";
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
      return grid[a] === player && grid[b] === player && grid[c] === player;
    });
  }

  function checkDraw() {
    return grid.every(cell => cell !== "");
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }

  function playGame(index) {
    if (!makeMove(index)) {
      console.log("Invalid move. Try again.");
      return;
    }

    console.log(grid);

    if (checkWin(currentPlayer)) {
      console.log(`${currentPlayer} wins!`);
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
  };
}

const TicTacToe = createTicTacToe()
TicTacToe.playGame(0)
TicTacToe.playGame(1)
TicTacToe.playGame(3)
TicTacToe.playGame(4)
TicTacToe.playGame(6)

TicTacToe.resetGame()
TicTacToe.playGame(0)