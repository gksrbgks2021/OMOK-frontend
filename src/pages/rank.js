import "../styles/rankStyle.css";
import User from "../components/User";
import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";

function Rank() {
  return (
    <div id="wrapper">
      <StatusBar />
      <NavigationBar />
      <h2>Rank</h2>
      <div id="block">
        <div id="box">
          <User />
          <div id="second">
            <h1>2</h1>
          </div>
        </div>
        <div id="box">
          <User />
          <div id="first">
            <h1>1</h1>
          </div>
        </div>
        <div id="box">
          <User />
          <div id="third">
            <h1>3</h1>
          </div>
        </div>
      </div>
      <div id="others">
        <li>
          <div id="rankNum">
            <h3>4</h3>
            <User />
          </div>
          <div id="rankNum">
            <h3>5</h3>
            <User />
          </div>
          <div id="rankNum">
            <h3>6</h3>
            <User />
          </div>
        </li>
      </div>
    </div>
  );
}
export default Rank;
