"use strict";

function GameBoard() {
    let played = "";
    let board = ["", "", "", "", "", "", "", "", ""];
    const winCon = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];
  
    const getPlayed = () => played;
  
    const resetGame = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      played = false;
    };
  
    const addToken = (box, player) => {
      if (box > 8 || board[box]) {
        played = false;
        return;
      }
      board[box] = player;
      played = true;
    };
    const getBoard = () => board;
    const getWinCon = () => winCon;
    return { getBoard, addToken, getWinCon, getPlayed, resetGame };
  }

  function gameController() {
    let winner = false;
    let tie = false;
    const getWinner = () => winner;
    const board = GameBoard();
    const getBoard = () => board.getBoard();
    const checkTie = () => {
      if (tie === true) {
        return;
      }
      for (let i = 0; i < getBoard().length; i++) {
        if (!getBoard()[i].length) {
          return;
        }
      }
      tie = true;
    };
  
    const getTie = () => tie;
  
    const players = [
      { name: "PlayerOne", token: "X" },
      { name: "PlayerTwo", token: "O" },
    ];
    let activePlayer = players[0];
  
    const getActivePlayer = () => activePlayer;
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
  
    const resetStatus = () => {
      board.resetGame();
      activePlayer = players[0];
      winner = false;
      tie = false;
    };
  
    const playRound = (box) => {
      board.addToken(box, activePlayer.token);
      checkWincon();
      checkTie();
      if (winner === true || tie === true) {
        return;
      }
      switchPlayerTurn();
    };
  
    const checkWincon = () => {
      let first, second, third;
      let theBoard = board.getBoard();
      let winCon = board.getWinCon();
      let currentPlayer = getActivePlayer();
  
      for (let i = 0; i < winCon.length; i++) {
        winCon[i];
        first = winCon[i][0];
        second = winCon[i][1];
        third = winCon[i][2];
        if (
          theBoard[first] === currentPlayer.token &&
          theBoard[second] === currentPlayer.token &&
          theBoard[third] === currentPlayer.token
        ) {
          winner = true;
          break;
        }
      }
    };
  
    return {
      playRound,
      getActivePlayer,
      getTie,
      getWinner,
      getBoard,
      resetStatus,
    };
  }
  

  function displayController() {
    const startGame = gameController();
    const resetButton = document.querySelector(".draw");
    const turns = document.querySelector(".winner-score");
    const cells = document.querySelectorAll(".cells");
  
    const changeColors = () => {
      cells.forEach((cell) => {
        if (cell.textContent === "O") {
          cell.style.color = "yellow";
        } else cell.style.color = "#70cbf6";
      });
    };
  
    resetButton.addEventListener("click", () => {
      startGame.resetStatus();
      cells.forEach((cell) => {
        cell.textContent = "";
        turns.textContent = `${startGame.getActivePlayer().token}'s turn`;
        cell.style.pointerEvents = "auto";
      });
    });
  
    turns.textContent = `${startGame.getActivePlayer().token}'s turn`;
  
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (e.target.textContent) {
          return;
        }
        e.target.textContent = `${startGame.getActivePlayer().token}`;
        startGame.playRound(e.target.dataset.cell);
        changeColors();
        if (startGame.getWinner() === true) {
          turns.textContent = `${startGame.getActivePlayer().token} Won!`;
          cells.forEach((cell) => {
            cell.style.pointerEvents = "none";
          });
          return;
        }
        if (startGame.getTie() === true) {
          turns.textContent = `Its a Tie`;
          return;
        }
        turns.textContent = `${startGame.getActivePlayer().token}'s turn`;
      });
    });
  }
  
  displayController();
  