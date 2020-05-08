//@flow
import React from "react";

//images
import CountdownLogo from "../../assets/images/countdown-logo.png";
import CountdownLogoDark from "../../assets/images/countdown-logo-dark.png";

type HeaderProps = {
  theme: string,
};

const Header = (props: HeaderProps) => {
  return (
    <div
      className={` ${
        props.theme === "Dark" ? "Header Header--dark" : "Header"
      }`}
    >
      <img
        src={props.theme === "Dark" ? CountdownLogoDark : CountdownLogo}
        alt="Countdown Logo"
      />
    </div>
  );
};

export default Header;
