//@flow
import React, { Fragment } from "react";

//icons
import StopLight from "./StopLight";
import StopDark from "./StopDark";

type StopProps = {
  hover: boolean,
  theme: string
};

const Stop = (props: StopProps) => {
  return (
    <Fragment>
      {props.theme === "Dark" ? (
        <StopDark hover={props.hover} />
      ) : (
        <StopLight hover={props.hover} />
      )}
    </Fragment>
  );
};

Stop.defaultProps = {
  hover: false,
  theme: "Dark"
};

export default Stop;
