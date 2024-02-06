import React from "react";
import { useEffect, useSelector } from "react";
import { useRef } from "react";
import { useState } from "react";
import TurnReducer from "../stores/TurnReducer";
import { Change_Turn } from "../stores/TurnReducer";
import { useDispatch } from "react-redux";

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }

//     if (delay !== null) {
//       const id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

let blackTime = 60 * 3;
let whiteTime = 60 * 3;

function whiteDecrease() {
  // console.log("화이트 줄이기");
  whiteTime -= 1;
}

function blackDecrease() {
  // console.log("블랙 줄이기");
  blackTime -= 1;
}

// 카운트 다운 컴포넌트
function Countdown(props) {
  // const [time, setTime] = useState({ minutes: 3, seconds: 0 });
  // const [blackTime, setBlackTime] = useState({ minutes: 3, seconds: 0 });
  const savedCallback = useRef();

  const dispatch = useDispatch();
  let isBlackTurn = useSelector(state.turn.isBlackTurn);
  console.log(isBlackTurn);
  useEffect(() => {
    let black = blackDecrease;
    let white = whiteDecrease;

    let id = null;
    if (isBlackTurn) {
      // let id = setInterval(black, 1000);
      console.log(isBlackTurn);
      dispatch(Change_Turn());
      // clearInterval(id);
    } else {
      // let id = setInterval(white, 1000);
      console.log(isBlackTurn);
      dispatch(Change_Turn());
      // clearInterval(id);
    }
    return () => clearInterval(id);
  }, 1000);

  // const handleClicked = () => {
  //   setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
  //   handleTurnChange((prevTurn) => (prevTurn === 0 ? 1 : 0));
  // };

  // const handleClicked = () => {
  //   setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
  //   if (currentPlayer === 0) {
  //     setWhiteTime((prevTime) => ({ ...prevTime }));
  //   } else {
  //     setBlackTime((prevTime) => ({ ...prevTime }));
  //   }
  // };
  const getMin = (t) => {
    return t / 60;
  };
  const getSec = (t) => {
    return t % 60;
  };
  const timeGoes = (t) => {
    return t - 1;
  };

  return (
    <div>
      <p>Black Time left: {blackTime}</p>
      <p>White Time left: {whiteTime}</p>
    </div>
  );
}

export default Countdown;
