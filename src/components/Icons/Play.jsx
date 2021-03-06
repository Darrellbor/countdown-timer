//@flow
import React, { Fragment } from "react";

//icons
import PlayLight from "./PlayLight";
import PlayDark from "./PlayDark";

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
