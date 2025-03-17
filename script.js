document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const playAgainButton = document.getElementById("play-again");
    const startButton = document.getElementById("start-btn"); // ✅ Start Button
    let cells = [];
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameStarted = false; // ✅ Track game state

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.innerText = `Player ${gameState[a]} Wins!`;
                popupMessage.innerText = `Player ${gameState[a]} Wins!`;
                popup.style.display = "block";
                board.style.pointerEvents = "none";
                return;
            }
        }

        if (!gameState.includes("")) {
            status.innerText = "It's a Draw!";
            popupMessage.innerText = "It's a Draw!";
            popup.style.display = "block";
            board.style.pointerEvents = "none";
        }
    }

    function handleClick(index) {
        if (gameState[index] === "" && popup.style.display === "none") {
            gameState[index] = currentPlayer;
            cells[index].innerText = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.innerText = `Player ${currentPlayer}'s turn`;
        }
    }

    function resetGame() {
        gameState = ["", "", "", "", "", "", "", "", ""]; // ✅ Reset game state
        currentPlayer = "X";
        status.innerText = "Player X's turn";
        popup.style.display = "none";
        board.style.pointerEvents = "auto";
        createBoard(); // ✅ Reset board properly
    }

    function createBoard() {
        board.innerHTML = "";
        cells = []; // ✅ Reset cells array

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText = ""; // ✅ Clear old text
            board.appendChild(cell);
            cells.push(cell);
        }

        // ✅ Ensure event listeners are attached to every cell
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => handleClick(index));
        });
    }

    // ✅ Start button with Reset logic
    startButton.addEventListener("click", () => {
        resetGame(); // ✅ Apply Reset logic to Start button
        board.style.display = "grid"; // ✅ Show board
        status.style.display = "block"; // ✅ Show status
        startButton.innerText = "Reset"; // ✅ Change text to Reset
        gameStarted = true;
    });

    playAgainButton.addEventListener("click", resetGame);
});
