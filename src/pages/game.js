import {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";
import * as StompJs from "@stomp/stompjs";
function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8002/ws/websocket',
      connectHeaders: {
        login: 'user',
        password: 'password',
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect : () => {
        subscribe();
      }
    });

    client.current.activate(); // 메소드 자체가 없습니다.
  }

  const subscribe = () => {
    client.current.subscribe('/play/user', (msg) => {
      const newMessage = JSON.parse(msg.body).message ;
      addContent(newMessage);
    });
  }

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const addContent = (message) => {
    setContent(content.concat(message));
  }

  const handler = (message) => {
    if (!client.current.connected)
      return;

    client.current.publish({
      destination: '/app/hello',
      body: JSON.stringify({
        message: message
      }),
    })
  }

  const disConnect = () => {
    if (client.current.connected)
      client.current.deactivate();
  }

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
