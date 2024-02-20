import React, { Component } from "react";
import User from "./User";

class Room extends Component {
  render() {
    return (
      <div>
        <div id="title">code:abd7 김씨만</div>
        <User />
      </div>
    );
  }
}

export default Room;
