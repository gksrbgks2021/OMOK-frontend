import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import { useDispatch, connect, useSelector } from "react-redux";
import "../styles/GomokuBoard.css";
import Countdown from "../pages/timer";
import blackIcon from "../styles/icon/board/black.png";
import whiteIcon from "../styles/icon/board/white.png";
import { emptyMsg, noticeMsg } from "../stores/TurnReducer";
import {
  chatMsgStatus,
  chatRoomIdStatus,
  initMessage,
  senderIdStatus,
  setMessageText,
} from "../stores/ChatReducer";

const GomokuBoard = () => {
  // const { gameType } = useParams();
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const path = url.pathname;
  const gameType = path.split("/").pop();
  const dispatch = useDispatch();
  const isBlackTurn = useSelector((state) => state.turn.isBlack);
  const msgQueueFlag = useSelector((state) => state.turn.isThereMsg);
  const [turn, setTurn] = useState(true); //turn 0 == black, 1 == white
  const [content, setContent] = useState("");
  const [userList, SetUserList] = useState([]);
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);
  const [timerInterval, setTimerInterval] = useState(null);
  const [icon, setIcon] = useState(blackIcon);
  const client = useRef({});
  const [cellState, setCellState] = useState(
    Array.from({ length: 15 }, () => Array(15).fill(null))
  );

  const chatState = useSelector(chatMsgStatus);
  const redux_chatRoomId = useSelector(chatRoomIdStatus);
  const redux_senderId = useSelector(senderIdStatus);
  const userEmail = useSelector((state) => state.auth.email);

  const connect = (roomId) => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8002/ws/websocket",
      connectHeaders: {
        senderEmail: userEmail ? userEmail : "guest",
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

  const disConnect = () => {
    if (client.current.connected) client.current.deactivate();
  };

  useEffect(() => {
    console.log("클라이언트 연결됨", client.current.connected);
    connect(chatRoomIdStatus);
  }, [client.current.connected]);

  useEffect(() => {
    console.log(`현재 chatState:`, client.current.connected);
    /*웹소켓으로 메시지 전송*/
    if (client.current && client.current.connected) {
      console.log(chatState);
      console.log("연결됐지롱");
      const destination = "/app/message"; // Adjust based on your server endpoint
      // client.current.send(destination, {}, JSON.stringify({
      //   chatState,
      // }));
    } else {
      console.error("웹소켓 연결이 안됐습니다....");
    }
  }, [redux_chatRoomId, redux_senderId]);
  // This ensures the log reflects the latest state after updates.

  useEffect(() => {
    if (msgQueueFlag === false) {
      console.log("msgQeueueFLag 변경됨");
    }
  }, [msgQueueFlag]);

  const handleClick = (i, j) => {
    // console.log(`Cell clicked: (${i}, ${j})`);
    // console.log("state: ", isBlackTurn);
    if (gameType === "offline") {
      if (cellState[i][j] === null) {
        const newCellState = [...cellState];
        newCellState[i][j] = turn;
        if (isBlackTurn === true) {
          setIcon(whiteIcon);
          dispatch({ type: "blackTurn" });
        } else {
          setIcon(blackIcon);
          dispatch({ type: "whiteTurn" });
        }
        setCellState(newCellState);
        setTurn(turn === true ? false : true);
      }
    } else {
      //온라인 일때 클릭 이벤트 핸들링.
      if (cellState[i][j] === null) {
        const newCellState = [...cellState];
        newCellState[i][j] = turn;
        setCellState(newCellState);
        // setTurn(turn === true ? false : true);
      }
      //전송할 메시지 세팅
      if (isBlackTurn === true) {
        dispatch(setMessageText(`${i},${j}::black::${blackTime}`));
      } else {
        dispatch(setMessageText(`${i},${j}::white::${whiteTime}`));
      }
      //스위치 온
      dispatch(noticeMsg());
      dispatch(emptyMsg());
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isBlackTurn) {
        setWhiteTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
      } else {
        setBlackTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
      }
      // console.log("state: ", isBlackTurn);
    }, 1000);

    setTimerInterval(timer);

    return () => clearInterval(timer);
  }, [isBlackTurn]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const boardSize = 15;
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const cellClassName = `cell ${
        cellState[i][j] === true
          ? "black"
          : cellState[i][j] === false
          ? "white"
          : ""
      }`;
      row.push(
        <div
          className={cellClassName}
          key={`${i}-${j}`}
          onClick={() => handleClick(i, j)}
        />
      );
    }
    board.push(<div key={i}>{row}</div>);
  }

  const playerStatus = (idx) => {
    if (gameType === "offline") {
      return userList[idx];
    } else {
      if (idx === 0) {
        return userList.length < 1 ? "유저1 미입장" : userList[0];
      } else if (idx === 1) {
        return userList.length < 2 ? "유저2 미입장" : userList[1];
      }
    }
  };

  useEffect(() => {
    console.log("게임타입 = ", gameType);
    if (gameType === "offline") {
      let arr = ["유저 1", "유저 2"];
      SetUserList(arr);
    }
  }, []);

  if (gameType === "offline") {
    return (
      <div>
        <div id="contaier">
          <div id="counter">
            <Countdown />
          </div>
        </div>
        <h2 id="currentPlayer">
          Current Player: <img src={icon} alt="Icon" id="icon" />
        </h2>
        <div id="contain_board">
          <div className="board">{board}</div>
          {/* Adding a 320x320px rectangle */}
          <div id="back_board"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div id="contaier">
          <div>
            <br />
            <br />
            Player1
            <br />
            {playerStatus(0)}
          </div>
          <div id="counter">
            <Countdown />
          </div>
          <div>
            <br />
            <br />
            Player2
            <br />
            {playerStatus(1)}
          </div>
        </div>
        <h2>
          Current Player: <img src={icon} alt="Icon" id="icon" />
        </h2>
        <div id="contain_board">
          <div className="board">{board}</div>
          {/* Adding a 320x320px rectangle */}
          <div id="back_board"></div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  isBlackTurn: state.isBlackTurn,
});

export default connect(mapStateToProps)(GomokuBoard);
