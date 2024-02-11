import { useEffect, useRef, useState } from "react";
import "../styles/onlinePageStyle.css";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import {
  URL_GET_GETALLROOM,
  URL_POST_CREATEROOM,
  URL_POST_ENTERROOM,
} from "../constants/UrlConstants";
import { Route, Router, Routes, useNavigate, Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {initMessage} from "../stores/ChatReduer";

const MessageType = {
  ENTER: 'ENTER',
  TALK: 'TALK',
};

function Online() {
  const [counter, setCounter] = useState(100);
  const [content, setContent] = useState("");
  const [chatRoomData, setChatRoomData] = useState([]);
  const client = useRef({});

  const messageField = useRef(null);
  const myChatRoom = null;
  const navigate = useNavigate();

  const chatState = useSelector(state => state.chat);
  const dispatch = useDispatch();

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8002/ws/websocket",
      connectHeaders: {
        login: "user",
        password: "password",
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });
    /*활성화 시켜준다. */
    client.current.activate();
  };

  const subscribe = (roomId) => {
    client.current.subscribe(`/queue/${roomId}`, msg_callback);
  };
  /*broker 가 client 한테 메시지 전송할때마다, 트리거되는 콜백 함수.*/
  const msg_callback = (message) => {
    if (message.body) {
      console.log('got message with body ' + message.body);
    } else {
      console.log('got empty message');
    }
  }
  const addContent = (message) => {
    setContent(content.concat(message));
  };

  useEffect(() => {
    connect();
    axios({
      method: "get",
      url: URL_GET_GETALLROOM,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(`응답: `, response);
        let data = response.data;
        setChatRoomData(data);
      })
      .catch((error) => {
        console.error("Error during get request:", error);
      });
    return () => disConnect();
  }, []);

  const handler = (message) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({
        message: message,
      }),
    });
  };

  const disConnect = () => {
    if (client.current.connected) client.current.deactivate();
  };

  const handleCreateRoom = () => {

    console.log("버튼 클릭됨");
    const formData = new URLSearchParams();

    let roomId = "roomA";
    let senderId ="";
    do{
      senderId = prompt("유저 이름을 입력해 주세요");
    }while(senderId === "");

    let fee = counter.valueOf();

    axios({
      method: "post",
      url: URL_POST_CREATEROOM,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: roomId,
        user: senderId,
        fee: fee,
      },
    })
      .then((response) => {
        console.log(`응답: `, response);
        let data = response.data;
      })
      .catch((error) => {
        console.error("Error during post request:", error);
      });

    /*입장 메시지 redux에 초기화 후 저장.*/
    dispatch(initMessage(roomId, senderId));
    /*웹소켓으로 메시지 전송*/
    if (client.current && client.current.connected) {
      const destination = "/app/message"; // Adjust based on your server endpoint
      client.current.send(destination, {}, JSON.stringify({
        messageType: chatState.messageType,
        chatRoomId: chatState.chatRoomId,
        senderId: chatState.senderId,
        messageText: `${senderId} entered the room.`,
      }));
    } else {
      console.error("웹소켓 연결이 안됐습니다....");
    }
    /*게임 방 이동*/
    navigate("/game/online");
  };

  const updateCounter = (value) => {
    setCounter((prevCounter) => prevCounter + value);
  };

  return (
    <div>
      <div id="betting">
        <div id="betting-text">Entry Fee (Betting)</div>
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
        <h3 id="explaination">make a room</h3>
        <button id="button" onClick={handleCreateRoom}>
          Generate Room Code
        </button>
        <h3 id="explaination">join an existing room</h3>
        <input
          id="enter-code"
          type="text"
          placeholder="Enter Friend Code..."
        ></input>
        <button id="button">Start Game!</button>
      </div>
    </div>
  );
}
export default Online;
