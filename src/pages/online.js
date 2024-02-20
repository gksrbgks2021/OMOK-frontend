import { useEffect, useRef, useState } from "react";
import "../styles/onlinePageStyle.css";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import {
  URL_GET_GETALLROOM,
  URL_POST_CREATEROOM,
  URL_POST_ENTERROOM,
  URL_GET_FRIENDROOM,
} from "../constants/UrlConstants";
import { Route, Router, Routes, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  chatMsgStatus,
  chatRoomIdStatus,
  initMessage,
  senderIdStatus,
} from "../stores/ChatReducer";

const MessageType = {
  ENTER: "ENTER",
  TALK: "TALK",
};

function Online() {
  const [counter, setCounter] = useState(100);
  const [content, setContent] = useState("");
  const [chatRoomData, setChatRoomData] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null); // 방 정보를 상태로 저장
  const client = useRef({});

  const messageField = useRef(null);
  const myChatRoom = null;
  const navigate = useNavigate();

  const chatState = useSelector(chatMsgStatus);
  const redux_chatRoomId = useSelector(chatRoomIdStatus);
  const redux_senderId = useSelector(senderIdStatus);

  const dispatch = useDispatch();

  const connect = (roomId) => {
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
        console.log("onConnect 실행됨...");
        subscribe(roomId);
        client.current.publish({
          destination: "/chatroom/roomA",
          body: "Hello world",
        });
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
    const subscription = client.current.subscribe(
      `/chatroom/${roomId}`,
      msg_callback
    );
    return subscription;
  };

  /*broker 가 client 한테 메시지 전송할때마다, 트리거되는 콜백 함수.*/
  const msg_callback = (message) => {
    if (message.body) {
      console.log("받아온 메시지 : " + message.body);
    } else {
      console.log("메시지 is empty !!");
    }
  };
  const addContent = (message) => {
    setContent(content.concat(message));
  };

  useEffect(() => {
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
  }, []);

  const handler = (message) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/app/game/msg",
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
    let senderId = "";
    do {
      senderId = prompt("유저 이름을 입력해 주세요");
    } while (senderId === "");

    let fee = counter.valueOf();

    //웹 소켓 연결
    connect(roomId);

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
        /*입장 메시지 redux에 초기화 후 저장.*/
        dispatch(initMessage(roomId, senderId));

        navigate("/game/online");
      })
      .catch((error) => {
        console.error("Error during post request:", error);
      });
  };

  const handleStart = () => {
    console.log("게임시작!");
    var inputValue = document.getElementById("enter-code").value;
    console.log("Entered code:", inputValue);
    /*전송 요청을 합니다.*/
    axios({
      method: "post",
      url: URL_GET_FRIENDROOM + roomInfo.roomId,
      // url: URL_GET_GETALLROOM,
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
    console.log("url = ", URL_GET_FRIENDROOM + roomInfo.roomId);
  };

  const searchRooms = () => {
    console.log("방찾기!");
    /*전송 요청을 합니다.*/
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
  };

  const updateCounter = (value) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  useEffect(() => {
    console.log("devdev", client.current.connected);
  }, [client.current.connected]);

  useEffect(() => {
    console.log(`현재 chatState:`, client.current.connected);
    /*웹소켓으로 메시지 전송*/
    if (client.current && client.current.connected) {
      console.log(chatState);
      console.log("연결됐지롱");
      const destination = "/app/message"; // Adjust based on your server endpoint
      client.current.send(
        destination,
        {},
        JSON.stringify({
          chatState,
        })
      );
    } else {
      console.error("웹소켓 연결이 안됐습니다....");
    }
  }, [redux_chatRoomId, redux_senderId]); // This ensures the log reflects the latest state after updates.

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
        <button id="generatebutton" onClick={handleCreateRoom}>
          Generate Room Code
        </button>
        <h3 id="explaination">join an existing room</h3>
        <input
          id="enter-code"
          type="text"
          placeholder="Enter Friend Code..."
        ></input>
        <Link to="/game/online/play">
          <button id="startbutton" onClick={handleStart}>
            Start Game!
          </button>
        </Link>
        <Link to="/game/online/roomlist">
          <button id="searchbutton" onClick={searchRooms}>
            Search Rooms
          </button>
        </Link>
        <div id="roomInfo">
          <div>
            {roomInfo && (
              <div>
                <p>Room Name: {roomInfo.name}</p>
                <p>Room ID: {roomInfo.roomId}</p>
                {/* 기타 방 정보 출력 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Online;
