// Gameboard to manage the board state
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    // Function to get the board
    const getBoard = () => board;
  
    // Function to update the board at a specific index
    const updateBoard = (index, player) => {
      if (board[index] === "") {
        board[index] = player;
        return true; // Move successful
      }
      return false; // Move invalid
    };
  
    // Function to reset the board
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, updateBoard, resetBoard };
  })();
  
  // Game controller to manage the flow of the game
  const GameController = (() => {
    const cells = document.querySelectorAll(".cell");
    const resultDisplay = document.getElementById("result");
  
    let currentPlayer = "X";
    let gameActive = true;
  
    // Winning patterns
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    // Initialize the game
    const init = () => {
      cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
      });
      createResetButton();
    };
  
    // Handle a cell click
    const handleCellClick = (index) => {
      if (!gameActive) return;
  
      if (Gameboard.updateBoard(index, currentPlayer)) {
        updateUI();
        checkWinner();
        switchPlayer();
      }
    };
  
    // Update the UI based on the current board state
    const updateUI = () => {
      const board = Gameboard.getBoard();
      cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.toggle("taken", board[index] !== ""); // Add class if cell is taken
      });
    };
  
    // Check for a winner or a tie
    const checkWinner = () => {
      const board = Gameboard.getBoard();
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          gameActive = false;
          highlightWinner(pattern);
          resultDisplay.textContent = `${currentPlayer} Wins! 🎉`;
          return;
        }
      }
  
      // Check for a tie
      if (!board.includes("")) {
        gameActive = false;
        resultDisplay.textContent = "It's a Tie!";
      }
    };
  
    // Highlight the winning pattern
    const highlightWinner = (pattern) => {
      pattern.forEach(index => {
        cells[index].style.backgroundColor = "#90EE90";
      });
    };
  
    // Switch current player
    const switchPlayer = () => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    };
  
    // Reset game
    const resetGame = () => {
      Gameboard.resetBoard();
      currentPlayer = "X";
      gameActive = true;
      resultDisplay.textContent = "";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.style.backgroundColor = "#f0f0f0";
      });
    };
  
    // Reset button
    const createResetButton = () => {
      resetButton.textContent = "Restart Game";
      resetButton.style.marginTop = "20px";
      resetButton.style.fontSize = "1rem";
      resetButton.style.padding = "10px";
      resetButton.onclick = resetGame;
      document.body.appendChild(resetButton);
    };
  
    return { init };
  })();
  
  // Start game
  GameController.init();
  