import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import { URL_GET_GETALLROOM } from "../constants/UrlConstants";
import "../styles/roomlistStyle.css";
import {
  chatMsgStatus,
  chatRoomIdStatus,
  initMessage,
  senderIdStatus,
  setMessageText,
} from "../stores/ChatReducer";

function Roomlist(props) {
  const [chatRoomData, setChatRoomData] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null); // 방 정보를 상태로 저장
  const chatState = useSelector(chatMsgStatus);
  const redux_chatRoomId = useSelector(chatRoomIdStatus);
  const redux_senderId = useSelector(senderIdStatus);

  const client = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let data;

  useEffect(() => {
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
        data = response.data;
        setChatRoomData(data);
      })
      .catch((error) => {
        console.error("Error during get request:", error);
      });
  }, []);

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
          destination: `/chatroom/${roomId}`,
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

  const msg_callback = (message) => {
    if (message.body) {
      console.log("받아온 메시지 : " + message.body);
    } else {
      console.log("메시지 is empty !!");
    }
  };

  function enterRoom(data) {
    //웹 소켓 연결
    connect(data.roomId);
    console.log("룸아이디 = ", data.roomId);
    dispatch(initMessage(JSON.parse(data.name).name, 5555));
    navigate("/game/online/onlineGame");
  }

  return (
    <div>
      <StatusBar />
      <NavigationBar />
      <h1 id="roomListTitle">Room List</h1>
      <div id="listBox">
        <div className="room">
          <div>code: A8D7</div>
          <div>김씨만 들어오셈!</div>
        </div>
        <div className="room">
          <div>code: C8G7</div>
          <div>박씨만 들어오셈!</div>
        </div>
        <div className="room">
          <div>code: D9R7</div>
          <div>이씨만 들어오셈!</div>
        </div>
        <div className="room">
          <div>code: U8O7</div>
          <div>최씨만 들어오셈!</div>
        </div>
      </div>

      <ul>
        {chatRoomData &&
          chatRoomData.map((data) => (
            <li key={data.roomId} onClick={() => enterRoom(data)}>
              <h2>방 이름: {JSON.parse(data.name).name}</h2>
              <p>사용자: {JSON.parse(data.name).user}</p>
              <p>요금: {JSON.parse(data.name).fee}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Roomlist;
