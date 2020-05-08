//@flow
import React, { type Node, useState } from "react";

type ControlsProps = {
  theme: string,
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
      className={`Controls ${
        props.theme === "Dark"
          ? "Controls--dark"
          : "Controls--light"
      } ${props.controlClicked && "Controls__clicked"} `}
      onMouseOver={() => toggleHover(true)}
      onMouseOut={() => toggleHover(false)}
      onClick={props.onClick}
    >
      <div className="Controls__inner">
        {props.textPos === "left" && <h5>{props.text}</h5>}
        <span>{hover ? props.hoverIcon : props.icon}</span>
        {props.textPos === "right" && <h5>{props.text}</h5>}
      </div>
    </div>
  );
};

Controls.defaultProps = {
  textPos: "right",
};

export default Controls;
