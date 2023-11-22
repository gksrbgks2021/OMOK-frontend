import React, { Component, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Modal from "react-modal";
import GomokuBoard from "./components/GomokuBoard.tsx";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Game() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <h2>Game</h2>
      <ul>
        <li>
          <button onClick={() => setModalIsOpen(true)}>Online</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <button>Create Code</button>
            <button>Enter Code</button>
            <button onClick={() => setModalIsOpen(false)}>x</button>
          </Modal>
        </li>
        <li>
          <Link to="/game/offline">Offline</Link>
        </li>
      </ul>
    </div>
  );
}
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
  return (
    <div>
      <h1>O-MOK</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/friend">Friend</Link>
        </li>
        <li>
          <Link to="/rank">Rank</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
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
