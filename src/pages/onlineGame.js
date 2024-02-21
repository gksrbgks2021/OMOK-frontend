import React, { useEffect, useState } from "react";
import "../styles/gameRoom.css";
import GomokuBoard from "../components/GomokuBoard.js";

function OnlineGame() {
  return (
    <div id="contaier">
      <div id="board">
        <GomokuBoard></GomokuBoard>
      </div>
    </div>
  );
}
export default OnlineGame;
