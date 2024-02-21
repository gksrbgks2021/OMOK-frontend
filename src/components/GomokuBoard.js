import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  chatMsgStatus,
  chatRoomIdStatus,
  initMessage,
  senderIdStatus,
  setMessageText,
} from "../stores/ChatReducer";
import "../styles/GomokuBoard.css";
import Countdown from "../pages/offline";

const GomokuBoard = () => {
  const { gameType } = useParams();
  const dispatch = useDispatch();
  const isBlackTurn = useSelector((state) => state.turn.isBlack);
  const [turn, setTurn] = useState(true); //turn 0 == black, 1 == white
  const [userList, SetUserList] = useState([]);
  const [cellState, setCellState] = useState(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );

  const handleClick = (i, j) => {
    // console.log(`Cell clicked: (${i}, ${j})`);
    // console.log("state: ", isBlackTurn);
    if (gameType === "offline") {
      if (cellState[i][j] === null) {
        const newCellState = [...cellState];
        newCellState[i][j] = turn;
        if (isBlackTurn === true) {
          dispatch({ type: "blackTurn" });
        } else {
          dispatch({ type: "whiteTurn" });
        }
        setCellState(newCellState);
        setTurn(turn === true ? false : true);
      }
    } else {
      if (cellState[i][j] === null) {
        const newCellState = [...cellState];
        newCellState[i][j] = turn;
        setCellState(newCellState);
        // setTurn(turn === true ? false : true);
      }
      dispatch(setMessageText(`${i}, ${j}`));
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

  const playerStatus = (idx) => {
    if (gameType === "offline") {
      return userList[idx];
    } else {
      if (idx === 0) {
        return userList.length < 1 ? "유저1 미입장" : userList[0];
      } else if (idx === 1) {
        return userList.length < 2 ? "유저2 미입장" : userList[1];
      }
    }
  };

  useEffect(() => {
    console.log(gameType);
    if (gameType === "offline") {
      let arr = ["유저 1", "유저 2"];
      SetUserList(arr);
    }
  }, []);

  return (
    <div>
      <div id="contaier">
        <div>
          <br />
          <br />
          Player1
          <br />
          {playerStatus(0)}
        </div>
        <div id="counter">
          <Countdown />
        </div>
        <div>
          <br />
          <br />
          Player2
          <br />
          {playerStatus(1)}
        </div>
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
