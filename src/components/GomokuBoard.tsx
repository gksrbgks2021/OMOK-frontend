import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import "../styles/GomokuBoard.css";
import Countdown from "../pages/offline";

const GomokuBoard: React.FC = (isBlackTurn) => {
  // const isBlackTurn = useSelector((state) => state.isBlackTurn);
  const dispatch = useDispatch();
  const [turn, setTurn] = useState<boolean>(true); //turn 0 == black, 1 == white
  const [cellState, setCellState] = useState<boolean[][]>(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );

  const handleClick = (i: number, j: number) => {
    console.log(`Cell clicked: (${i}, ${j})`);
    console.log("state: ", isBlackTurn);
    if (cellState[i][j] === null) {
      const newCellState = [...cellState];
      newCellState[i][j] = turn;
      dispatch({ type: "changeTurn" });
      setCellState(newCellState);
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
        <Countdown />
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

const mapStateToProps = (state) => ({
  isBlackTurn: state.isBlackTurn,
});

export default connect(mapStateToProps)(GomokuBoard);
