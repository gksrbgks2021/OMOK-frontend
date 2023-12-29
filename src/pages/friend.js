import React from "react";
import { useState } from "react";
import "./friend.css";
function Friend() {
  <h2>Friend</h2>;

  const [text, setText] = useState("");
  const [names, setNames] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = () => {
    setNames((prevState) => {
      return [names, ...prevState];
    });
  };
  return (
    <div>
      <input
        id="fSearch"
        type="text"
        placeholder="search freinds"
        onChange={handleInputChange}
      ></input>
      <button onClick={handleUpload}>submit</button>
    </div>
  );
}
export default Friend;
