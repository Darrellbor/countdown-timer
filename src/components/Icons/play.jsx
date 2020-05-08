//@flow
import React, { Fragment } from "react";

//icons
import PlayLight from "./playLight";
import PlayDark from "./playDark";

type PlayProps = {
  hover: boolean,
  theme: string
};

const Play = (props: PlayProps) => {
  return (
    <Fragment>
      {props.theme === "Dark" ? (
        <PlayDark hover={props.hover} />
      ) : (
        <PlayLight hover={props.hover} />
      )}
    </Fragment>
  );
};

Play.defaultProps = {
  hover: false,
  theme: "Dark"
};

export default Play;
