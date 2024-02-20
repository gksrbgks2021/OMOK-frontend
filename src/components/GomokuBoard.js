import React, { useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import "../styles/GomokuBoard.css";
import Countdown from "../pages/offline";
import blackIcon from "../styles/icon/board/black.png";
import whiteIcon from "../styles/icon/board/white.png";

const GomokuBoard = () => {
  const dispatch = useDispatch();
  const isBlackTurn = useSelector((state) => state.turn.isBlack);
  const [turn, setTurn] = useState(true); //turn 0 == black, 1 == white
  const [cellState, setCellState] = useState(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );
  const [icon, setIcon] = useState(blackIcon);

  const handleClick = (i, j) => {
    console.log(`Cell clicked: (${i}, ${j})`);
    console.log("state: ", isBlackTurn);
    if (cellState[i][j] === null) {
      const newCellState = [...cellState];
      newCellState[i][j] = turn;
      if (isBlackTurn === true) {
        dispatch({ type: "blackTurn" });
        setIcon(whiteIcon);
      } else {
        dispatch({ type: "whiteTurn" });
        setIcon(blackIcon);
      }
      setCellState(newCellState);
      setTurn(turn === true ? false : true);
    }
  };

  const boardSize = 15;
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
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
      <h2 id="currentPlayer">
        Current Player:
        <img src={icon} alt="Icon" id="icon" />
      </h2>

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
