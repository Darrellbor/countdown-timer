//@flow
import React from "react";

//icons
import Dark from "../Icons/Dark";
import Light from "../Icons/Light";

type ThemeControllerProps = {
  theme: string,
  onClick: Function,
};

const ThemeController = (props: ThemeControllerProps) => {
  return (
    <div className="ThemeController">
      <div className="ThemeController__inner">
        <div
          className={` ${
            props.theme === "Dark"
              ? "ThemeController__dark "
              : "ThemeController__light"
          }`}
          data-setthemeto="Dark"
          onClick={props.onClick}
        >
          <Dark />
        </div>
        <div
          className={` ${
            props.theme === "Dark"
              ? "ThemeController__dark "
              : "ThemeController__light"
          }`}
          data-setthemeto="Light"
          onClick={props.onClick}
        >
          <Light />
        </div>
      </div>
    </div>
  );
};

export default ThemeController;
