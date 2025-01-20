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