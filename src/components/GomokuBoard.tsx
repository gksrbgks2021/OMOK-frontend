import React, { Component } from "react";
import "../styles/GomokuBoard.css";

const GomokuBoard: React.FC = () => {
  const handleClick = (i: number, j: number) => {
    console.log(`Cell clicked: (${i}, ${j})`);
  };

  const boardSize = 19;
  const board = [] as any;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board.push(
        <div
          className="cell"
          key={`${i}-${j}`}
          onClick={() => handleClick(i, j)}
        />
      );
    }
  }

  return <div className="board">{board}</div>;
};

export default GomokuBoard;
