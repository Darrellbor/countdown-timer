import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import SpeedControls from "./";

describe("Speed Controls Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SpeedControls
        theme="Dark"
        active={true}
        controlClicked={false}
        onClick={() => {}}
      >
        1X
      </SpeedControls>
    );
  });

  test("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("calls prop onClick when clicked", () => {
    const spy = sinon.spy();
    wrapper = shallow(<SpeedControls onClick={spy} />);

    wrapper.find(".SpeedControls").simulate("click");

    expect(spy.calledOnce).toBe(true);
  });

  test("renders children properly", () => {
    expect(wrapper.find(".SpeedControls__inner").contains("1X")).toBeTruthy();
  });

  test("check if theme class is applied", () => {
    expect(wrapper.exists(".SpeedControls--dark")).toBeTruthy();
  });

  test("check if active class is applied", () => {
    expect(wrapper.exists(".SpeedControls__active")).toBeTruthy();
  });
});
