//@flow
import React, { Fragment } from "react";

type pauseLightProps = {
  hover: boolean,
};

const pauseLight = (props: pauseLightProps) => {
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
            stroke="white"
          />
          <rect
            x="19.875"
            y="0.5"
            width="10.625"
            height="35"
            rx="1.5"
            stroke="white"
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
            fill="#282C34"
            stroke="#282C34"
          />
          <rect
            x="17.86"
            y="0.5"
            width="12.64"
            height="35"
            rx="1.5"
            fill="#282C34"
            stroke="#282C34"
          />
        </svg>
      )}
    </Fragment>
  );
};

pauseLight.defaultProps = {
  hover: false,
};

export default pauseLight;
