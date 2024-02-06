import React, { useState } from "react";
import "../styles/GomokuBoard.css";
import Countdown from "./offline";
import TurnReducer from "../stores/TurnReducer";
import { Change_Turn } from "../stores/TurnReducer";
import { useDispatch } from "react-redux";

const GomokuBoard: React.FC = () => {
  const [turn, setTurn] = useState<boolean>(true); //turn 0 == black, 1 == white
  const [cellState, setCellState] = useState<boolean[][]>(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );
  const dispatch = useDispatch();

  const handleClick = (i: number, j: number) => {
    console.log(`Cell clicked: (${i}, ${j})`);

    if (cellState[i][j] === null) {
      const newCellState = [...cellState];
      newCellState[i][j] = turn;
      setCellState(newCellState);

      dispatch(Change_Turn());
      setTurn(turn === true ? false : true);
    }
  };

  const boardSize = 15;
  const board = [] as any;
  for (let i = 0; i < boardSize; i++) {
    const row = [] as any;
    for (let j = 0; j < boardSize; j++) {
      const cellClassName = `cell ${
        cellState[i][j] === true
          ? "black"
          : cellState[i][j] === false
          ? "white"
          : ""
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
    <div>
      <div id="counter">
        <Countdown handleClick={turn} />
      </div>
      <h3>Current Player:</h3>
      <div id="contain_board">
        <div className="board">{board}</div>
        {/* Adding a 320x320px rectangle */}
        <div id="back_board"></div>
      </div>
    </div>
  );
};

export default GomokuBoard;
