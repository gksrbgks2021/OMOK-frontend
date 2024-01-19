import User from "../components/User";

function Profile(props) {
  return (
    <div>
      <h2>Profile</h2>
      <User />
      <hr></hr>
      <div id="daily">daily check-in streak {props.streak} 3days</div>
      <hr></hr>
      <div id="latest">
        Latest Stats<br></br> 10G 6W 4L 0D (60%) {props.streak}
      </div>
      <hr></hr>
      <div id="overall">
        Overall Stats<br></br> 10G 6W 4L 0D (60%) {props.overall}
      </div>
      <hr></hr>
      <div id="black">
        Black Stats<br></br> 10G 6W 4L 0D (60%) {props.black}
      </div>
      <hr></hr>
      <div id="whites">
        White Stats<br></br> 10G 6W 4L 0D (60%) {props.white}
      </div>
      <hr></hr>
    </div>
  );
}
export default Profile;
