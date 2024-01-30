import { useEffect, useRef, useState } from "react";
import "../styles/onlinePageStyle.css";
import * as StompJs from "@stomp/stompjs";
import { Route, Router, Routes, useNavigate, Link } from "react-router-dom";

function Online() {
  const [counter, setCounter] = useState(100);
  const [content, setContent] = useState("");
  const [chatRoom, setChatRoomData] = useState([]);
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

    onStompError: (frame) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };
  };
  /*활성화 시켜준다. */
  client.current.activate();
}

const subscribe = () => {
  client.current.subscribe("/play/user", (msg) => {
    const newMessage = JSON.parse(msg.body).message;
    addContent(newMessage);
  });
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
      name: formData,
    },
  })
    .then((response) => {
      console.log(`응답: `, response);
      let data = response.data;
    })
    .catch((error) => {
      console.error("Error during post request:", error);
    });
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
      <button id="button" onClick={getModal}>
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

export default Online;
