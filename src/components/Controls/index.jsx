//@flow
import React, { type Node, useState } from "react";

type ControlsProps = {
  icon: Node,
  hoverIcon: Node,
  text: string,
  textPos: string,
  controlClicked: Boolean,
  onClick: Function,
};

const Controls = (props: ControlsProps) => {
  const [hover, toggleHover] = useState(false);

  return (
    <div
      className={`Controls ${props.controlClicked && "Controls__clicked"} `}
      onMouseOver={() => toggleHover(true)}
      onMouseOut={() => toggleHover(false)}
      onClick={props.onClick}
    >
      <div className="Controls__inner">
        {props.textPos === "left" && <h4>{props.text}</h4>}
        <span>{hover ? props.hoverIcon : props.icon}</span>
        {props.textPos === "right" && <h4>{props.text}</h4>}
      </div>
    </div>
  );
};

Controls.defaultProps = {
  textPos: "right",
};

export default Controls;
