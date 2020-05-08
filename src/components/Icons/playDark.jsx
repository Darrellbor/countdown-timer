//@flow
import React, { Fragment } from "react";

type playDarkProps = {
  hover: boolean,
};

const playDark = (props: playDarkProps) => {
  return (
    <Fragment>
      {props.hover ? (
        <svg width="37" height="41" viewBox="0 0 37 41" fill="none">
          <path
            d="M35.0855 21.0361L2.19227 39.9259C1.85715 40.1183 1.4397 39.8741 1.44329 39.4876L1.79982 1.10049C1.80341 0.714057 2.22532 0.477603 2.55681 0.676248L35.0935 20.1737C35.421 20.3699 35.4166 20.846 35.0855 21.0361Z"
            stroke="#282C34"
          />
        </svg>
      ) : (
        <svg width="37" height="42" viewBox="0 0 37 42" fill="none">
          <path
            d="M35.0904 21.645L2.1959 40.5358C1.86078 40.7282 1.44334 40.484 1.44692 40.0976L1.80347 1.70822C1.80706 1.32178 2.22898 1.08532 2.56046 1.28397L35.0984 20.7825C35.4259 20.9788 35.4215 21.4548 35.0904 21.645Z"
            fill="white"
            stroke="white"
          />
        </svg>
      )}
    </Fragment>
  );
};

playDark.defaultProps = {
  hover: false,
};

export default playDark;
