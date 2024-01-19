
import "../styles/rankStyle.css";
import User from "../components/User";
import React, { Component } from "react";
import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";
import { useState } from "react";
import { styled } from "styled-components";


// const Place = styled.div`
//   background-color: #f2cd6e;
//   border-radius: 15% 15% 0 0;
//   width: 60px;
//   height: 160px;
//   margin-left: 20px;
// `;
//
// class UserRank extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   render() {
//     return <User />;
//   }
// }

function Rank() {
  return (
    <div id="wrapper">
      <StatusBar />
      <NavigationBar />
      <h2>Rank</h2>
      <div id="block">
        <div id="box">
          <User />
          <div id="second">
            <h1>2</h1>
          </div>
        </div>

        <div id="first">
          <User />
          <h1>1</h1>
        </div>
        <div id="third">
          <User />
          <h1>3</h1>
        </div>
      </div>
      <div id="others">
        <li>
          <User />
          <User />
          <User />
        </li>
      </div>
    </div>
  );
}
export default Rank;