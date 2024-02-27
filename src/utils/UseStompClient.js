import React, { useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

const useStompClient = (roomId) => {
  const clientRef = React.useRef(null);

  useEffect(() => {
    // Initialize StompJs.Client and store in ref for persistence across renders
    clientRef.current = new StompJs.Client({
      brokerURL: "ws://localhost:8002/ws/websocket",
      connectHeaders: {
        login: "user",
        password: "password",
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected");
        clientRef.current.subscribe(`/chatroom/${roomId}`, (message) => {
          console.log("Received message:", message.body);
        });
        clientRef.current.publish({
          destination: `/chatroom/${roomId}`,
          body: "Hello world",
        });
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    clientRef.current.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log("Disconnected");
      }
    };
  }, [roomId]); // Re-run this effect if roomId changes

  return clientRef.current;
};

const ChatComponent = ({ roomId }) => {
  const stompClient = useStompClient(roomId);

  // Component JSX
  return (
    <div>
      {/* Your component's UI here */}
      Chat room: {roomId}
    </div>
  );
};

export default ChatComponent;
