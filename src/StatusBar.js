import styled from "styled-components";
import token from "./styles/icon/statusBar/smile.png";

const StatBar = styled.div`
  text-align:center
  height: 20px;
  line-height: 20px;
  &.selected {
    font-weight: bold;
  }
`;

const Asset = styled.span;

//const Name = styled.

const StatusBar = () => {
  return (
    <div>
      <StatBar>
        <img src={token} alt="token" />
        123
      </StatBar>
    </div>
  );
};

export default StatusBar;
