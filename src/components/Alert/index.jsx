//@flow
import React, { type Node } from "react";

type AlertProps = {
  children: Node,
  isOpen: boolean,
  isTimeUp: Boolean,
  theme: string,
};

const Alert = (props: AlertProps) => {
  return (
    <div className={` Alert ${props.isOpen ? "Alert__open" : "Alert__close"}`}>
      <div
        className={` ${
          props.theme === "Dark"
            ? "Alert__inner Alert--dark"
            : "Alert__inner Alert--light"
        } ${props.isTimeUp && "Alert__timeup"}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Alert;
