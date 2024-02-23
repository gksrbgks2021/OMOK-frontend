import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";
import Room from "../components/room.js";
import { useEffect, useRef, useState } from "react";
import "../styles/roomlistStyle.css";

function Roomlist(props) {
  const [chatRoomData, setChatRoomData] = useState([]);

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
        let data = response.data;
        setChatRoomData(data.data);
        colsole.log("데이터 = ", data.data);
      })
      .catch((error) => {
        console.error("Error during get request:", error);
      });
  });

  return (
    <div>
      <StatusBar />
      <NavigationBar />
      <div id="available">Room Available</div>
      <div id="roomlist">
        <Room></Room>
        <Room></Room>
        <Room></Room>
        <Room></Room>
        <Room></Room>
      </div>
    </div>
  );
}

export default Roomlist;
