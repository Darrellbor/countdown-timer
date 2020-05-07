//@flow
import React, { Fragment } from "react";

type stopProps = {
  hover: boolean,
};

const stop = (props: stopProps) => {
  return (
    <Fragment>
      {props.hover ? (
        <svg width="35" height="36" viewBox="0 0 35 36" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="34"
            height="35"
            rx="0.5"
            stroke="white"
          />
        </svg>
      ) : (
        <svg width="35" height="36" viewBox="0 0 35 36" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="34"
            height="35"
            rx="0.5"
            fill="#282C34"
            stroke="#282C34"
          />
        </svg>
      )}
    </Fragment>
  );
};

stop.defaultProps = {
  hover: false,
};

export default stop;
