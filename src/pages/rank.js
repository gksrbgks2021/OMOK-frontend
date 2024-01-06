import "../styles/rankStyle.css";
import User from "../components/User";

function Rank() {
  return (
    <div id="wrapper">
      <h2>Rank</h2>
      <div id="block">
        <div id="second">
          <User />
        </div>
        <div id="first">
          <User />
        </div>
        <div id="third">
          <User />
        </div>
      </div>
      <div id="others">
        <li>
          <User />
          <User />
          <User />
        </li>
      </div>
    </div>
  );
}
export default Rank;
