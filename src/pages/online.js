import React, { useState } from "react";
import "../styles/onlinePageStyle.css";

function Online() {
  const [counter, setCounter] = useState(100);
  const updateCounter = (value) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  return (
    <div>
      <div id="betting">
        <div id="betting-text">Entry Fee (betting)</div>
        <div id="coin">{counter}</div>
        <button id="minus" onClick={() => updateCounter(-10)}>
          -
        </button>
        <button id="plus" onClick={() => updateCounter(10)}>
          +
        </button>
      </div>
      <div id="invitation">
        <div id="invitation-text">Game invitation</div>
        <button id="create-code">Generate Room Code</button>
        <input
          id="enter-code"
          type="text"
          placeholder="Enter Friend Code..."
        ></input>
        <button id="start">Start Game!</button>
      </div>
    </div>
  );
}
export default Online;
