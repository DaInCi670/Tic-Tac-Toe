"use strict";

function GameBoard() {
  let played = "";
  const board = ["", "", "", "", "", "", "", "", ""];
  const winCon = [
    [0, 1, 2],
    [1, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const getPlayed = () => played;

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
  return { getBoard, addToken, getWinCon, getPlayed };
}

function gameController() {
    let turnX = 0;
    let turnO = 0;
    let winner = false;
    const board = GameBoard();
    const players = [
      { name: "PlayerOne", token: "X" },
      { name: "PlayerTwo", token: "O" },
    ];
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
  
    const playRound = (box) => {
      board.addToken(box, activePlayer.token);
      if (board.getPlayed() === false) {
        return;
      }
      checkWincon();
      if (winner === true) {
        console.log(`${activePlayer.name} wins`);
        console.log(board.getBoard());
        return;
      }
      activePlayer.token === "X" ? (turnX += 1) : (turnO += 1);
      console.log(turnX, turnO);
      switchPlayerTurn();
      printNewRound();
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
  
    const printNewRound = () => {
      console.log(`${activePlayer.name}'s turn`);
      console.log(board.getBoard());
    };
    printNewRound();
  
    return { playRound, getActivePlayer, checkWincon };
  }
  
  const player = gameController();