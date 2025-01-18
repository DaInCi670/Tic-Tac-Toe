"use strict";

function Gameboard() {
  const rows = 8;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
  }
  const getBoard = () => board;

  const winCon = (x) => {
    if (board[0][0] === x && board[1][0] === x && board[2][0] === x) {
      console.log(x + " Won");
    }
    if (board[0][0] === x && board[5][0] === x && board[8][0] === x) {
      console.log(x + " Won");
    }
    if (board[0][0] === x && board[3][0] === x && board[6][0] === x) {
      console.log(x + " Won");
    }
    if (board[1][0] === x && board[4][0] === x && board[7][0] === x) {
      console.log(x + " Won");
    }
    if (board[2][0] === x && board[4][0] === x && board[6][0] === x) {
      console.log(x + " Won");
    }
    if (board[2][0] === x && board[5][0] === x && board[8][0] === x) {
      console.log(x + " Won");
    }
    if (board[3][0] === x && board[4][0] === x && board[5][0] === x) {
      console.log(x + " Won");
    }
    if (board[6][0] === x && board[7][0] === x && board[8][0] === x) {
      console.log(x + " Won");
    } else return;
  };

  const dropToken = (box, player) => {
    if (Number(box) > 8 || board[box].length) {
      return;
    }
    return board[box].push(player);
  };
  return { getBoard, dropToken, winCon };
}
