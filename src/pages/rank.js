import "../styles/rankStyle.css";
import User from "../components/User";
import React, { Component } from "react";
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
      <h2>Rank</h2>
      <div id="block">
        <div id="box">
          <User />
          <div id="second">
            <h1>2</h1>
          </div>
        </div>
        <div id="box">
          <User />
          <div id="first">
            <h1>1</h1>
          </div>
        </div>
        <div id="box">
          <User />
          <div id="third">
            <h1>3</h1>
          </div>
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
