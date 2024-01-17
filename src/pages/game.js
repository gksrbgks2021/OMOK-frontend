import React from "react";
import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";

function Game() {
  return (
    <div className="body">
      <h2>Game</h2>
      <ul>
        <li>
          <Link to="/game/online">
            <div id="onlineBtn"></div>
          </Link>
        </li>
        <li>
          <Link to="/game/offline">
            <div id="offlineBtn"></div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Game;
