import React from "react";
import { styled } from "styled-components";

const roomCode = "1234";
const Output = styled.output``;

const onlineModeCreateCode = () => {
  return (
    <div>
      <Output>{roomCode}</Output>
    </div>
  );
};
