import React from "react";

const roomCode = "1234";
const Output = styled.output``;

const onlineModeCreateCode = () => {
  return (
    <div>
      <Output>{roomCode}</Output>
    </div>
  );
};
