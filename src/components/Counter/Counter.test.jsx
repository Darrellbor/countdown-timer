import React from "react";
import { shallow } from "enzyme";

import Counter from "./";

describe("Speed Controls Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Counter
        theme="Dark"
        minute="00"
        second="31"
        isPaused={true}
        isTextBlinking={true}
        isTextRed={true}
        isTimeUp={true}
      />
    );
  });

  test("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("check if theme class is applied", () => {
    expect(wrapper.exists(".Counter--dark")).toBeTruthy();
  });

  test("check if minute is displayed", () => {
    expect(wrapper.find(".Counter__minute").contains("00")).toBeTruthy();
  });

  test("check if second is displayed", () => {
    expect(wrapper.find(".Counter__second").contains("31")).toBeTruthy();
  });

  test("check if paused class is applied", () => {
    expect(wrapper.exists(".Counter__paused")).toBeTruthy();
  });

  test("check if text red class is applied", () => {
    expect(wrapper.exists(".Counter__textred")).toBeTruthy();
  });

  test("check if text is blinking class is applied", () => {
    expect(wrapper.exists(".Counter__blinking")).toBeTruthy();
  });

  test("check if counter time up  class is applied", () => {
    expect(wrapper.exists(".Counter__timeup")).toBeTruthy();
  });
});
