import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";
import Room from "../components/room.js";
import "../styles/roomlistStyle.css";

function Roomlist(props) {
  return (
    <div>
      <StatusBar />
      <NavigationBar />
      <div id="available">Room Available</div>
      <Room></Room>
      <Room></Room>
      <Room></Room>
      <Room></Room>
      <Room></Room>
    </div>
  );
}

export default Roomlist;
