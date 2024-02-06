import {useRef,useEffect, useState} from "react";
import Modal from "react-modal";
import {Link, useNavigate} from "react-router-dom";
import "../styles/gamePageStyle.css";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import {URL_GET_GETALLROOM,URL_POST_CREATEROOM} from "../constants/UrlConstants";

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [chatRoomData, setChatRoomData] = useState([]);
  const client = useRef({});

  const subscribes = useState([]); // 구독 리스트를 저장해서, 구독 취소할때 사용.
  const messageField = useRef(null);
  const myChatRoom = null;
  const navigate = useNavigate();

  const subscribeCancle = () => {
    let length = subscribes.length;
    for(let i = 0 ; i < length; i++){
      let sid = subscribes.pop();
      client.current.unsubscribe(sid.id);
    }
  }

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

  /*모달창이 열리면, 채팅방 리스트 요청을 합니다.*/
  useEffect(() => {
    if(modalIsOpen){
      console.log("get all chatroom 요청");

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

    client.current.publish({
      destination: '/app/message',
      body: JSON.stringify({
        message: message,
        senderId: "mysender",
        chatRoomId: "채팅방1",
        messageType: "TALK",
      }),
    })
  }
  const disConnect = () => {
    if (client.current.connected)
      client.current.deactivate();
  }
  const handleCreateRoom = () => {
    console.log("버튼 클릭됨");
    const formData = new URLSearchParams();
    let name = "1 님의 방";
    formData.append('name', name);

    axios({
      method: "post",
      url: URL_POST_CREATEROOM,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name:name
      },
    })
        .then(response => {
          console.log(`응답: `, response);
          let data = response.data;
        })
        .catch(error => {
          console.error("Error during post request:", error);
        });
    navigate('/game/online');
  };
  const handleRoomClick = () => {

    navigate('/game/online');
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
                    <div key={channel} onClick={handleRoomClick}>
                      <p>Channel Name: {channel}</p>
                      <p>{JSON.stringify(chatRoomData[channel]['name'])}</p>
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
