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
  setMessageText,
} from "../stores/ChatReducer";

const MessageType = {
  ENTER: "ENTER",
  TALK: "TALK",
};

function Online() {
  const [counter, setCounter] = useState(100);
  const [chatRoomData, setChatRoomData] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null); // 방 정보를 상태로 저장
  const client = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let data;

  // const handler = (message) => {
  //   if (!client.current.connected) return;

  //   client.current.publish({
  //     destination: "/app/game/msg",
  //     body: JSON.stringify({
  //       message: message,
  //     }),
  //   });
  // };

  const handleCreateRoom = () => {
    console.log("버튼 클릭됨");
    const formData = new URLSearchParams();

    let roomId = "roomA";
    let senderId = "";
    do {
      senderId = prompt("유저 이름을 입력해 주세요.");
      roomId = prompt("방 이름을 설정해주세요.");
    } while (senderId === "");

    let fee = counter.valueOf();

    //웹 소켓 연결
    // connect(roomId);

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
        console.log("방 이름 : ", data.name);
        console.log("룸코드 : ", data.roomId);
        setRoomInfo(data);

        navigate("/game/online/onlineGame");
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
      url: URL_GET_FRIENDROOM + inputValue,
      // url: URL_GET_GETALLROOM,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(`응답: `, response);
        let data = response.data;
        setChatRoomData(data);
        navigate("/game/online/onlineGame");
      })
      .catch((error) => {
        console.error("Error during get request:", error);
      });
    console.log("url = ", URL_GET_FRIENDROOM + inputValue);
  };

  // const searchRooms = () => {
  //   console.log("방찾기!");
  //   /*전송 요청을 합니다.*/
  //   axios({
  //     method: "get",
  //     url: URL_GET_GETALLROOM,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(`응답: `, response);
  //       let data = response.data;
  //       setChatRoomData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error during get request:", error);
  //     });
  // };

  const updateCounter = (value) => {
    // 새로운 상태값을 계산합니다.
    const newCounter = counter + value;

    // 새로운 상태값이 0보다 작으면 0으로 설정
    // 1000보다 크면 1000으로 설정
    if (newCounter < 10) {
      setCounter(10);
    } else if (newCounter >= 1000) {
      setCounter(1000);
    } else {
      setCounter(newCounter);
    }
    // setCounter((prevCounter) => prevCounter + value);
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
        <button id="generatebutton" onClick={handleCreateRoom}>
          Create a room
        </button>
        <h3 id="explaination">join an existing room</h3>
        <input
          id="enter-code"
          type="text"
          placeholder="Enter Friend Code..."
        ></input>
        <button id="startbutton" onClick={handleStart}>
          Start Game!
        </button>
        <Link to="/game/online/roomlist">
          <button id="viewlistbutton">Join room list</button>
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
