import { useEffect, useRef, useState } from "react";
import "../styles/onlinePageStyle.css";

import * as StompJs from "@stomp/stompjs";
function Online() {
  const [counter, setCounter] = useState(100);
  const [content, setContent] = useState("");
  const client = useRef({});

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
    });

    client.current.activate(); // 메소드 자체가 없습니다.
  };

  const subscribe = () => {
    client.current.subscribe("/play/user", (msg) => {
      const newMessage = JSON.parse(msg.body).message;
      addContent(newMessage);
    });
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const addContent = (message) => {
    setContent(content.concat(message));
  };

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
  };
  const updateCounter = (value) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  return (
    <div>
      <div id="betting">
        <div id="betting-text">Entry Fee (betting)</div>
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
        <button id="create-code">Generate Room Code</button>
        <input
          id="enter-code"
          type="text"
          placeholder="Enter Friend Code..."
        ></input>
        <button id="start">Start Game!</button>
      </div>
    </div>
  );
}
export default Online;
