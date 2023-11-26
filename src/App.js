import React from "react";
import { Route, Routes } from "react-router-dom";
import GomokuBoard from "./components/GomokuBoard.tsx";
import Home from "./pages/Home.js";
import Game from "./pages/game.js";
import NavigationBar from "./NavigationBar";

function Friend() {
  return (
    <div>
      <h2>Friend</h2>
    </div>
  );
}
function Rank() {
  return (
    <div>
      <h2>Rank</h2>
    </div>
  );
}
function Profile() {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
}

function App() {
  /*
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  */
  return (
    <div>
      <h1>O-MOK</h1>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game/offline" element={<GomokuBoard />} />
        <Route path="/*" element={"Not Found"} />
      </Routes>
    </div>
  );
}
export default App;
