import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import Controls from "./";
import Pause from "../Icons/Pause";

describe("Controls Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Controls
        theme="Dark"
        icon={<Pause />}
        hoverIcon={<Pause hover={true} />}
        text="Pause Timer"
        textPos="right"
        controlClicked={false}
        onClick={() => {}}
      />
    );
  });

  test("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("calls prop onClick when clicked", () => {
    const spy = sinon.spy();
    wrapper = shallow(<Controls onClick={spy} />);

    wrapper.find(".Controls").simulate("click");

    expect(spy.calledOnce).toBe(true);
  });

  test("check if theme class is applied", () => {
    expect(wrapper.exists(".Controls--dark")).toBeTruthy();
  });

  test("Check if text is displayed", () => {
    expect(wrapper.find("h5").text()).toBe("Pause Timer");
  });

  test("Check if text is displayed on the left", () => {
    wrapper = shallow(<Controls textPos="left" />);
    expect(wrapper.exists("#Controls__inner__left")).toEqual(true);
  });

  test("Check if text is displayed on the right", () => {
    expect(wrapper.exists("#Controls__inner__right")).toEqual(true);
  });

  test("Check if icon is displayed", () => {
    expect(
      wrapper.find("span").contains(<Pause hover={false} theme="Dark" />)
    ).toEqual(true);
  });

  test("Check if icon is displayed on hover", () => {
    wrapper.find(".Controls").simulate("mouseover");
    expect(
      wrapper.find("span").contains(<Pause hover={true} theme="Dark" />)
    ).toEqual(true);
  });
});
