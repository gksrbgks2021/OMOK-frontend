import "../styles/rankStyle.css";

function Rank() {
  return (
    <div id="wrapper">
      <h2>Rank</h2>
      <div id="block">
        <div id="second">
          <div className="user">user</div>
          <div className="text">2</div>
        </div>
        <div id="first">
          <div className="user">user</div>
          <div className="text">1</div>
        </div>
        <div id="third">
          <div className="user">user</div>
          <div className="text">3</div>
        </div>
      </div>
      <div id="others">
        <li>
          <ol className="user">user</ol>
          <ol className="user">user</ol>
          <ol className="user">user</ol>
        </li>
      </div>
    </div>
  );
}
export default Rank;
