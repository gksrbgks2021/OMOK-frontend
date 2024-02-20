import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect, useSelector } from "react-redux";
import "../styles/gameRoom.css";
import Countdown from "../pages/offline";

function OnlineGame() {
  const { gameType } = useParams();
  const dispatch = useDispatch();
  const [userList, SetUserList] = useState([]);

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
  );
}
export default OnlineGame;
