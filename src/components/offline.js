import React from "react";
import white from "./styles/icon/board/white.png";
import black from "./styles/icon/board/black.png";

function Offline() {
  return (
    <div id="topPlayer">
      <img src="{black}" alt="black" />
      <h2>Time Left</h2>
      <p>{"${minutes}:${seconds}"}</p>
    </div>
  );
}

export default Offline;
