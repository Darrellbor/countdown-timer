//@flow
import React from "react";

type CounterProps = {
  minute: string,
  second: string,
  isPaused: Boolean,
  isTextBlinking: Boolean,
  isTextRed: Boolean,
  isTimeUp: Boolean,
};

const Counter = (props: CounterProps) => {
  return (
    <div
      className={`Counter ${props.isTimeUp && "Counter__timeup"}  ${
        props.isTextRed && " Counter__textred"
      } ${props.isTextBlinking && " Counter__blinking"}`}
    >
      <div className="Counter__inner">
        <div className={`Counter__minute`}>{props.minute}</div>
        <div className="Counter__colon">:</div>
        <div
          className={` ${
            !props.isPaused
              ? "Counter__second"
              : "Counter__second Counter__changed"
          }`}
        >
          {props.second}
        </div>
      </div>
    </div>
  );
};

export default Counter;
