import User from "../components/User";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoutContainer = styled.div`
  text-align: right;
  margin-top: auto; /* Push the logout button to the bottom */
  margin-right: 20px; /* Add some right margin for spacing */
  margin-top: 100px;
`;

function Profile(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add any logout logic here
    // For now, let's navigate to the main page
    navigate("/");
  };

  return (
    <ProfileContainer>
      <StatusBar />
      <NavigationBar />
      <hr width="100%" />
      <hr width="100%" />
      <User />
      <hr width="100%" />
      <div id="daily">daily check-in streak {props.streak} 3days</div>
      <hr width="100%" />
      <div id="latest">
        Latest Stats<br></br> 10G 6W 4L 0D (60%) {props.streak}
      </div>
      <hr width="100%" />
      <div id="overall">
        Overall Stats<br></br> 10G 6W 4L 0D (60%) {props.overall}
      </div>
      <hr width="100%" />
      <div id="black">
        Black Stats<br></br> 10G 6W 4L 0D (60%) {props.black}
      </div>
      <hr width="100%" />
      <div id="whites">
        White Stats<br></br> 10G 6W 4L 0D (60%) {props.white}
      </div>
      <hr width="100%" />
      <LogoutContainer onClick={handleLogout}>logout</LogoutContainer>
    </ProfileContainer>
  );
}

export default Profile;
