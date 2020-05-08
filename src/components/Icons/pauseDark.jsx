//@flow
import React, { Fragment } from "react";

type pauseDarkProps = {
  hover: boolean,
};

const pauseDark = (props: pauseDarkProps) => {
  return (
    <Fragment>
      {props.hover ? (
        <svg width="31" height="36" viewBox="0 0 31 36" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="10.625"
            height="35"
            rx="1.5"
            stroke="#282C34"
          />
          <rect
            x="19.875"
            y="0.5"
            width="10.625"
            height="35"
            rx="1.5"
            stroke="#282C34"
          />
        </svg>
      ) : (
        <svg width="31" height="36" viewBox="0 0 31 36" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="12.64"
            height="35"
            rx="1.5"
            fill="white"
            stroke="white"
          />
          <rect
            x="17.86"
            y="0.5"
            width="12.64"
            height="35"
            rx="1.5"
            fill="white"
            stroke="white"
          />
        </svg>
      )}
    </Fragment>
  );
};

pauseDark.defaultProps = {
  hover: false,
};

export default pauseDark;
