//@flow
import React, { Fragment } from "react";

//icons
import PauseLight from "./pauseLight";
import PauseDark from "./pauseDark";

type PauseProps = {
  hover: boolean,
  theme: string
};

const Pause = (props: PauseProps) => {
  return (
    <Fragment>
      {props.theme === "Dark" ? (
        <PauseDark hover={props.hover} />
      ) : (
        <PauseLight hover={props.hover} />
      )}
    </Fragment>
  );
};

Pause.defaultProps = {
  hover: false,
  theme: "Dark"
};

export default Pause;
