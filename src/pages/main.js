import "../styles/mainPageStyle.css";
import {GOOGLE, KAKAO, GUEST } from "../constants/VARIABLE";
import styled from 'styled-components';


const MainLoginContainer = styled.div`
margin-top: 40%;
`;

function main({ onButtonClick }) {
  return (
    <MainLoginContainer>
      <div id="mainLogo" />
      <div id="omok">O-MOK</div>
      <button className="loginBtn" id={GOOGLE} onClick={() => onButtonClick(GOOGLE)} />
      <button className="loginBtn" id={KAKAO} onClick={() => onButtonClick(KAKAO)} />
      <button className="loginBtn" id={GUEST} onClick={() => onButtonClick(GUEST)} />
    </MainLoginContainer>
  );
}

export default main;
