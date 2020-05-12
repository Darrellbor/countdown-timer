//@flow
import React, { useState } from "react";

import { checkValidity } from "../../shared/validations";

import Input from "../Form/Input";
import Button from "../Form/Button";

type FooterProps = {
  theme: string,
  onStart: Function,
};

const Footer = (props: FooterProps) => {
  const [mins, setMins] = useState({
    value: "",
    valid: false,
    focused: false,
    messageClassName: "None",
  });
  const [formIsValid, toggleFormIsValid] = useState(false);

  const handleInputOnChange = (event, validations) => {
    const value = event.target.value;

    const updatedFormElement: Object = {
      ...mins,
      value,
      valid: checkValidity(value, validations),
      messageClassName:
        !checkValidity(value, validations) && value !== ""
          ? "input__message--error"
          : "none",
    };

    let formIsValid = true;
    formIsValid = updatedFormElement.valid && formIsValid;

    setMins(updatedFormElement);
    toggleFormIsValid(formIsValid);
  };

  const handleInputFocus = (updatedState) => {
    const updatedFormElement: Object = {
      ...mins,
      ...updatedState,
    };

    setMins(updatedFormElement);
  };

  const handleOnStart = (e) => {
    e.preventDefault();

    if (mins.value !== "" && mins.value >= 1 && mins.value <= 60) {
      const value = mins.value;

      const updatedFormElement: Object = {
        ...mins,
        value: "",
      };

      setMins(updatedFormElement);
      props.onStart(value);
    } else {
      window.alert("Countdown must be within 1 minute");
    }
  };

  return (
    <div
      className={`Footer ${
        props.theme === "Dark" ? " Footer--dark" : "Footer--light"
      }`}
    >
      <div className="Footer__inner">
        <form onSubmit={handleOnStart}>
          <div className="row">
            <div className="col-md-3">
              <h3>Countdown:</h3>
            </div>

            <div className="col-md-6">
              <Input
                attributes={{
                  type: "number",
                  placeholder: "Enter countdown in mins",
                  required: true,
                  theme: props.theme === "Dark" ? "default-dark" : "default",
                  value: mins.value,
                  onChange: (event) =>
                    handleInputOnChange(event, {
                      required: true,
                      isNumeric: true,
                      minLength: 1,
                      maxLength: 60,
                    }),
                  onFocus: () =>
                    handleInputFocus({
                      focused: true,
                    }),
                  onBlur: () =>
                    handleInputFocus({
                      focused: false,
                    }),
                }}
                hasError={!mins.valid}
                focused={mins.focused}
                message={
                  !mins.valid && !mins.focused && mins.value !== ""
                    ? "The number of minutes is required and should be less than 1 hour and be a positive whole number!"
                    : ""
                }
                messageClassName={mins.messageClassName}
              />
            </div>
            <div className="col-md-3">
              <Button
                color={props.theme === "Dark" ? "brand-dark" : "brand"}
                disabled={!formIsValid}
              >
                Start
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Footer;
