import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <h2>Game</h2>
      <ul>
        <li>
          <button onClick={() => setModalIsOpen(true)}>Online</button>
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
          <Link to="/game/offline">Offline</Link>
        </li>
      </ul>
    </div>
  );
}

export default Game;
