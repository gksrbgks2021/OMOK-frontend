import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

// useInterval 훅 정의
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// 카운트 다운 컴포넌트
function Countdown() {
  const [time, setTime] = useState({ minutes: 3, seconds: 0 });

  const [blackTime, setBlackTime] = useState({ ...time });
  const [whiteTime, setWhiteTime] = useState({ ...time });

  // const handleClicked = ()=>{
  //   const nextPlayer = activePlayer =
  // }
  // 1초마다 시간 감소
  useInterval(() => {
    if (time.minutes === 0 && time.seconds === 0) {
      // 타이머 종료 로직
      // 예를 들어, 다른 동작 수행이 가능합니다.
    } else {
      setTime((prevTime) => {
        const newTime = { ...prevTime };

        if (newTime.seconds === 0) {
          newTime.minutes -= 1;
          newTime.seconds = 59;
        } else {
          newTime.seconds -= 1;
        }

        return newTime;
      });
    }
  }, 1000);

  // 분과 초를 두 자리 숫자로 표시
  const formattedTime = `${String(time.minutes).padStart(2, "0")}:${String(
    time.seconds
  ).padStart(2, "0")}`;

  return (
    <div>
      <p>Time left: {formattedTime}</p>
    </div>
  );
}

export default Countdown;
