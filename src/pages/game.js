import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCreateRoom = () => {
    console.log("버튼 클릭됨");
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
          {/*방 만들기 모달창*/}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            appElement={document.getElementById("root") || undefined}
          >
            <div id = "container">
              <button
                  id="modalBtn"
                  onClick={handleCreateRoom}
              >
                Create Room
              </button>
              <input
                  id = "myinput"
                  value="방 이름 검색"
              />
              <button id="modalBtn"> Search </button>
              <button onClick={() => setModalIsOpen(false)}>x</button>
            </div>
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
