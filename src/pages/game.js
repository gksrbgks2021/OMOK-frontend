import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";
import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";


function Game() {
  return (
    <div className="body">
      <StatusBar />
      <NavigationBar />
      <h2>Game</h2>
      <ul>
        <li>
          <Link to="/mainroom">
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
