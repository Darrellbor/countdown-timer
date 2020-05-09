//@flow
import React, { Fragment } from "react";

type stopDarkProps = {
  hover: boolean,
};

const stopDark = (props: stopDarkProps) => {
  return (
    <Fragment>
      {props.hover ? (
        <svg width="35" height="36" viewBox="0 0 35 36" fill="none">
          <rect
            x="0.5"
            y="0.499969"
            width="34"
            height="35"
            rx="0.5"
            stroke="#282C34"
          />
        </svg>
      ) : (
        <svg width="35" height="36" viewBox="0 0 35 36" fill="none">
          <rect
            x="0.5"
            y="0.499969"
            width="34"
            height="35"
            rx="0.5"
            fill="white"
            stroke="white"
          />
        </svg>
      )}
    </Fragment>
  );
};

stopDark.defaultProps = {
  hover: false,
};

export default stopDark;
