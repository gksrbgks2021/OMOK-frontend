import {useRef,useEffect, useState} from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../styles/gamePageStyle.css";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import {URL_GET_GETALLROOM} from "../constants/UrlConstants";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [chatRoomData, setChatRoomData] = useState([]);
  const client = useRef({});

  const messageField = useRef(null);
  const myChatRoom = null;
  const connect = () => {
    /*client 객체를 만듭니다.*/
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8002/ws/websocket',
      connectHeaders: {
        login: 'user',
        password: 'password',
      },
      debug: function (str) {
        console.log(str);
      },
      /*연결 됐을때 실행할 함수*/
      onConnect : () => {
        subscribe();
      }
      ,
      onStompError : (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      }
    });

    /*활성화 시켜준다. */
    client.current.activate();
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

  useEffect(() => {
    if(modalIsOpen){
      console.log("get all chatroom 요청");
      /*전송 요청을 합니다.*/
      axios({
        method: "get",
        url: URL_GET_GETALLROOM,
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            console.log(`응답: `, response);
            let data = response.data;
            setChatRoomData(data);
          })
          .catch(error => {
            console.error("Error during get request:", error);
          });
    }
  }, [modalIsOpen]);

  const addContent = (message) => {
    setContent(content.concat(message));
  }

  const sendHandler = () => {
    if (!client.current.connected)
      return;

    let message = messageField.current.value;
    console.log("메시지 전송 요청", message);
    /*메시지를 보냅니다.*/
    client.current.send();
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
                  ref = {messageField}
                  id = "myinput"
              />
              <button id="modalBtn" onClick={sendHandler}> 메시지 보내기 </button>
              <button onClick={() => setModalIsOpen(false)}>x</button>
            </div>
            <div id = "list_room">
              {chatRoomData && Object.keys(chatRoomData).map(channel => (
                    <div key={channel}>
                      <p>Channel Name: {channel}</p>
                      <p>{JSON.stringify(chatRoomData[channel])}</p>
                    </div>
                ))}
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
