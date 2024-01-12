import "../styles/mainPageStyle.css";
import {GOOGLE, KAKAO, GUEST } from "../constants/VARIABLE";

function main({ onButtonClick }) {
  return (
    <div>
      <div id="mainLogo" />
      <div id="omok">O-MOK</div>
      <button className="loginBtn" id={GOOGLE} onClick={() => onButtonClick(GOOGLE)} />
      <button className="loginBtn" id={KAKAO} onClick={() => onButtonClick(KAKAO)} />
      <button className="loginBtn" id={GUEST} onClick={() => onButtonClick(GUEST)} />
    </div>
  );
}

export default main;
