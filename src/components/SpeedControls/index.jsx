//@flow
import React, { type Node } from "react";

type SpeedControlsProps = {
  children: Node,
  active: Boolean,
  controlClicked: Boolean,
  onClick: Function,
};

const SpeedControls = (props: SpeedControlsProps) => {
  return (
    <div
      className={`SpeedControls ${
        props.controlClicked && "SpeedControls__clicked"
      } ${props.active && " SpeedControls__active"} `}
      onClick={props.onClick}
    >
      <div className="SpeedControls__inner">{props.children}</div>
    </div>
  );
};

export default SpeedControls;
