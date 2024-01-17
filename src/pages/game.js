import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [counter, setCounter] = useState(100);
  const updateCounter = (value) => {
    setCounter((prevCounter) => prevCounter + value);
  };

  return (
    <div className="body">
      <h2>Game</h2>
      <ul>
        <li>
          <input
            type="button"
            id="onlineBtn"
            onClick={() => setModalIsOpen(true)}
          />
          <Modal
            contentClassName="modal"
            style={{ width: "500px" }}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            appElement={document.getElementById("root") || undefined}
          >
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
            <button onClick={() => setModalIsOpen(false)}>x</button>
          </Modal>
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
