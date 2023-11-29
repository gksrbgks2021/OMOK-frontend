import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="body">
      <h2>Game</h2>
      <ul>
        <li>
          <input
            type="button"
            id="offlineBtn"
            onClick={() => setModalIsOpen(true)}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            appElement={document.getElementById("root") || undefined}
          >
            <button>Create Code</button>
            <button>Enter Code</button>
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
