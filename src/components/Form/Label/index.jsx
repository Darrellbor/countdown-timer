//@flow
import React, { type Node } from "react";

type LabelProps = {
  children: Node
};

const Label = (props: LabelProps) => {
  return <label className="label">{props.children}</label>;
};

export default Label;
