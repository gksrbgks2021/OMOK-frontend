import * as StompJs from "@stomp/stompjs";

const INIT_CLIENT = "INIT_CLIENT";
const SEND_MESSAGE = "SEND_MESSAGE";

const initialState = {
  client: null,
};

const stompClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SEND_MESSAGE:
      return {};
  }
};
//define action
export const initCLient = (userEmail) => ({
  type: INIT_CLIENT,
  payload: new StompJs.Client({
    brokerURL: "ws://localhost:8002/ws/websocket",
    connectHeaders: {
      email: userEmail,
    },
    debug: function (str) {
      console.log(str);
    },
    onConnect: () => {
      console.log("Connected");
      // Additional connection logic here
    },
    onStompError: (frame) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    },
  }),
});
export const sendMessage = (msg) => ({});
