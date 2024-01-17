import User from "../components/User";

function Profile(props) {
  return (
    <div>
      <hr></hr>
      <hr></hr>
      <User />
      <hr></hr>
      <div id="daily-streak">daily check-in streak {props.streak} 3days</div>
      <hr></hr>
      <div id="stats">
        <div id="latest">
          Latest Stats <br></br>
          10G 6W 4L 0D (60%)
          {props.latest}
        </div>
        <hr></hr>
        <div id="overall">
          Overall Stats <br></br>
          10G 6W 4L 0D (60%)
          {props.overall}
        </div>
        <hr></hr>
        <div id="black">
          Black Stats <br></br>
          10G 6W 4L 0D (60%)
          {props.black}
        </div>
        <hr></hr>
        <div id="white">
          White Stats <br></br>
          10G 6W 4L 0D (60%)
          {props.white}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
export default Profile;
