import { NavLink } from "react-router-dom";
import styled from "styled-components";
import gameImage from "./styles/icon/navBar/game.png";
import friendImage from "./styles/icon/navBar/friend.png";
import rankImage from "./styles/icon/navBar/rank.png";
import profileImage from "./styles/icon/navBar/profile.png";
import "./styles/navigationBarStyle.css";

const NavBar = styled(NavLink)`
  text-align: center;
  float: left;
  width: 25%;
  background-color: #fff3b5;

  // 세로길이 설정
  height: 45px;
  line-height: 45px;
  &.selected {
    font-weight: bold;
  }
`;

const NavigationBar = () => {
  return (
    <div className="wrapper">
      <NavBar to="/game">
        <img src={gameImage} alt="game" />
      </NavBar>

      <NavBar to="/friend">
        <img src={friendImage} alt="friend" />
      </NavBar>

      <NavBar to="/rank">
        <img src={rankImage} alt="rank" />
      </NavBar>

      <NavBar to="/profile">
        <img src={profileImage} alt="profile" />
      </NavBar>
    </div>
  );
};

export default NavigationBar;
