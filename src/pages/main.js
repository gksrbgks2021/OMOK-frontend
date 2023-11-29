import "../styles/mainPageStyle.css";

function main({ onButtonClick }) {
  return (
    <div>
      <div id="mainLogo" />
      <div id="omok">O-MOK</div>
      <button className="loginBtn" id="googleLogin" onClick={onButtonClick} />
      <button className="loginBtn" id="kakaoLogin" onClick={onButtonClick} />
      <button className="loginBtn" id="guestLogin" onClick={onButtonClick} />
    </div>
  );
}

export default main;
