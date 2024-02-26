import React, { useEffect, useState } from "react";
import {
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import GomokuBoard from "./components/GomokuBoard.js";
import MainPage from "./pages/main.js";
import Game from "./pages/game.js";
import Online from "./pages/online.js";
import Tab from "./pages/friend.js";
import Rank from "./pages/rank.js";
import Profile from "./pages/profile.js";
import Roomlist from "./pages/roomlist.js";
import NavigationBar from "./NavigationBar.js";
import StatusBar from "./StatusBar.js";
import JwtLoginProcess from "./utils/JwtLoginProcess";
import { showMain } from "./stores/MainReducer/index.js";
import "./App.css";
import { GOOGLE, KAKAO, GUEST } from "./constants/VARIABLE";
import axios from "axios";
import { URL_POST_TEST, URL_POST_SOCIALLOGIN } from "./constants/UrlConstants";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const hideMain = useSelector((state) => state.main.isMainShown);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log("변경됨..: ", hideMain);
  }, [hideMain]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      console.log("서버로부터 redirect 받아옴...", tokenParam);
      dispatch(showMain());
      navigate("/game");
    }
  }, [location]);

  return (
    <div className="App">
      <div className="screen">
        {!hideMain ? (
          <MainPage />
        ) : (
          <>
            <StatusBar />
            <NavigationBar />
            {token && <JwtLoginProcess token={token} />}
            <Routes>
              <Route path="/game" element={<Game />} />
              <Route path="/friend" element={<Tab />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/game/offline" element={<GomokuBoard />} />
              <Route path="/game/online" element={<Online />} />
              <Route path="/game/online/onlineGame" element={<GomokuBoard />} />
              <Route path="/game/online/roomlist" element={<Roomlist />} />
              <Route path="/*" element={"Not Found"} />
            </Routes>
          </>
        )}
      </div>
    </div>
  );
}

/*
  //반응형 함수(?) 일단은 안씀
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  */
export default App;
