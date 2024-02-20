import { useEffect, useRef, useState } from "react";
import "../styles/onlinePageStyle.css";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import {
  URL_GET_GETALLROOM,
  URL_POST_CREATEROOM,
  URL_GET_FRIENDROOM,
} from "../constants/UrlConstants";
import { Route, Router, Routes, useNavigate, Link } from "react-router-dom";

function Online() {
  const [counter, setCounter] = useState(100);
  const [content, setContent] = useState("");
  const [chatRoomData, setChatRoomData] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null); // 방 정보를 상태로 저장
  const client = useRef({});

  const messageField = useRef(null);
  const myChatRoom = null;
  const navigate = useNavigate();

  let data;

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

  const subscribe = () => {
    client.current.subscribe("/play/user", (msg) => {
      const newMessage = JSON.parse(msg.body).message;
      addContent(newMessage);
    });
  };

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
    let name = "1 님의 방";
    formData.append("name", name);

    axios({
      method: "post",
      url: URL_POST_CREATEROOM,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: name,
      },
    })
      .then((response) => {
        console.log(`응답: `, response);
        data = response.data;
        console.log("방 이름 : ", data.name);
        console.log("룸코드 : ", data.roomId);

        // 방 정보를 업데이트
        setRoomInfo(data);
      })
      .catch((error) => {
        console.error("Error during post request:", error);
      });
    navigate("/game/online");
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

  console.log("데이터 = ", data);
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
          placeholder="Enter Friend Code..."></input>
        <Link to="/game/online/play">
          <button id="startbutton" onClick={handleStart}>
            Start Game!
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
