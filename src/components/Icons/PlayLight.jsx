//@flow
import React, { Fragment } from "react";

type playLightProps = {
  hover: boolean,
};

const playLight = (props: playLightProps) => {
  return (
    <Fragment>
      {props.hover ? (
        <svg width="37" height="41" viewBox="0 0 37 41" fill="none">
          <path
            d="M35.0855 21.0362L2.19227 39.9259C1.85715 40.1184 1.4397 39.8741 1.44329 39.4877L1.79982 1.10052C1.80341 0.714088 2.22532 0.477634 2.55681 0.676278L35.0935 20.1737C35.421 20.37 35.4166 20.846 35.0855 21.0362Z"
            stroke="white"
          />
        </svg>
      ) : (
        <svg width="37" height="42" viewBox="0 0 37 42" fill="none">
          <path
            d="M35.0904 21.645L2.1959 40.5358C1.86078 40.7283 1.44334 40.484 1.44692 40.0976L1.80347 1.70825C1.80706 1.32181 2.22898 1.08535 2.56046 1.284L35.0984 20.7825C35.4259 20.9788 35.4215 21.4549 35.0904 21.645Z"
            fill="#282C34"
            stroke="#282C34"
          />
        </svg>
      )}
    </Fragment>
  );
};

playLight.defaultProps = {
  hover: false,
};

export default playLight;
