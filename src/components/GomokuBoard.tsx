import React, { useState } from "react";
import "../styles/GomokuBoard.css";

const GomokuBoard: React.FC = () => {
  const [turn, setTurn] = useState<number>(0);
  const [cellState, setCellState] = useState<number[][]>(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );

  const handleClick = (i: number, j: number) => {
    console.log(`Cell clicked: (${i}, ${j})`);

    if (cellState[i][j] === null) {
      const newCellState = [...cellState];
      newCellState[i][j] = turn;
      setCellState(newCellState);
      setTurn(turn === 0 ? 1 : 0);
    }
  };

  const boardSize = 15;
  const board = [] as any;
  for (let i = 0; i < boardSize; i++) {
    const row = [] as any;
    for (let j = 0; j < boardSize; j++) {
      const cellClassName = `cell ${
        cellState[i][j] === 0 ? "black" : cellState[i][j] === 1 ? "white" : ""
      }`;

      row.push(
        <div
          className={cellClassName}
          key={`${i}-${j}`}
          onClick={() => handleClick(i, j)}
        />
      );
    }
    board.push(<div key={i}>{row}</div>);
  }

  return (
    <div id="contain_board">
      <div className="board">{board}</div>
      {/* Adding a 320x320px rectangle */}
      <div id="back_board"></div>
    </div>
  );
};

export default GomokuBoard;
