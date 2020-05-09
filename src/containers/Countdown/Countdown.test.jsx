import React from "react";
import { shallow } from "enzyme";

import Countdown from "./";

describe("Countdown Component", () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<Countdown />);
    instance = wrapper.instance();
  });

  test("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("handleSetMinute: should set minute state appropriately", () => {
    expect(wrapper.state("minute")).toBe("00");
    instance.handleSetMinute(5);
    expect(wrapper.state("minute")).toBe(5);
  });

  test("handleSetThemeColor: should set theme state appropriately", () => {
    expect(wrapper.state("theme")).toBe("Dark" || "Light");
    instance.handleSetThemeColor({
      target: { dataset: { setthemeto: "Light" } },
    });
    expect(wrapper.state("theme")).toBe("Light");
  });

  test("setTimedOut: should set state to time out appropriately", () => {
    instance.setTimedOut();
    expect(wrapper.state("minute")).toBe("00");
    expect(wrapper.state("second")).toBe("00");
    expect(wrapper.state("isTimeUp")).toBe(true);
    expect(wrapper.state("isAlertOpen")).toBe(true);
    expect(wrapper.state("alertContent")).toBe("Time's Up!");
    expect(wrapper.state("isTextBlinking")).toBe(false);
  });

  test("resetCountdown: should set state to default appropriately", () => {
    instance.resetCountdown();
    expect(wrapper.state("minute")).toBe("00");
    expect(wrapper.state("second")).toBe("00");
    expect(wrapper.state("isTimeUp")).toBe(false);
    expect(wrapper.state("isAlertOpen")).toBe(false);
    expect(wrapper.state("activeControl")).toBe("None");
    expect(wrapper.state("isTextBlinking")).toBe(false);
    expect(wrapper.state("activeSpeed")).toBe("1X");
  });

  test("handleOnPauseClick: should handle pause state with no time set", (done) => {
    instance.handleOnPauseClick();

    expect(wrapper.state("clicked")).toBe("Pause");

    setTimeout(() => {
      expect(wrapper.state("clicked")).toBe("None");
      done();
    }, 1000);
  });

  test("handleOnPauseClick: should handle pause state with time set", (done) => {
    instance.handleSetMinute(5);
    instance.handleOnPauseClick();

    expect(wrapper.state("clicked")).toBe("Pause");
    expect(wrapper.state("activeControl")).toBe("Paused");

    setTimeout(() => {
      expect(wrapper.state("clicked")).toBe("None");
      expect(wrapper.state("alertContent")).toBe("Timer Paused");
      expect(wrapper.state("isAlertOpen")).toBe(true);
      done();
    }, 1000);
  });

  test("handleOnStopClick: should handle stop state with no time set", (done) => {
    instance.handleOnStopClick();

    expect(wrapper.state("clicked")).toBe("Stop");

    setTimeout(() => {
      expect(wrapper.state("clicked")).toBe("None");
      done();
    }, 1000);
  });

  test("handleOnStopClick: should handle stop state with time set", (done) => {
    instance.handleSetMinute(5);
    instance.handleOnStopClick();

    expect(wrapper.state("clicked")).toBe("Stop");

    setTimeout(() => {
      expect(wrapper.state("clicked")).toBe("None");
      expect(wrapper.state("alertContent")).toBe("Timer Stoped & cleared");
      expect(wrapper.state("isAlertOpen")).toBe(true);
      done();
    }, 1000);
  });

  test("handleOnPlayClick: should handle on play appropriately", (done) => {
    instance.handleSetMinute(5);
    instance.handleOnPauseClick();
    instance.handleOnPlayClick();

    expect(wrapper.state("clicked")).toBe("Play");

    setTimeout(() => {
      expect(wrapper.state("activeControl")).toBe("Played");
      expect(wrapper.state("clicked")).toBe("None");
      expect(wrapper.state("isAlertOpen")).toBe(false);
      done();
    }, 1000);
  });

  test("handleOnSwitchSpeed: should handle on switch speed appropriately", (done) => {
    instance.handleSetMinute(5);
    instance.handleOnSwitchSpeed("2X");

    expect(wrapper.state("speedClicked")).toBe("2X");
    expect(wrapper.state("activeSpeed")).toBe("2X");

    setTimeout(() => {
      expect(wrapper.state("speedClicked")).toBe("None");
      done();
    }, 1000);
  });

  test("initializeCountdown: should update state if it wasn't paused and half time is calculated", () => {
    instance.handleSetMinute(5);
    instance.initializeCountdown();

    expect(wrapper.state("halfMinute")).toBe(2);
    expect(wrapper.state("halfSecond")).toBe("30");
  });

  test("initializeCountdown: should update second state every second", () => {
    instance.handleSetMinute(5);

    jest.useFakeTimers();
    expect(wrapper.state("minute")).toBe(5);
    instance.initializeCountdown();
    jest.advanceTimersByTime(3000);
    expect(wrapper.state("second")).toBe(57);
  });

  test("initializeCountdown: should update minute state every minute", () => {
    instance.handleSetMinute(7);

    jest.useFakeTimers();
    expect(wrapper.state("minute")).toBe(7);
    instance.initializeCountdown();
    jest.advanceTimersByTime(3000);
    expect(wrapper.state("minute")).toBe("06");
  });

  test("initializeCountdown: should update second state every 2s on 0.5x speed", () => {
    instance.handleSetMinute(7);

    jest.useFakeTimers();
    expect(wrapper.state("minute")).toBe(7);
    instance.initializeCountdown("0.5X");
    jest.runOnlyPendingTimers(2000);
    expect(wrapper.state("minute")).toBe("06");
    expect(wrapper.state("second")).toBe("59");
  });

  test("initializeCountdown: should update second state every 4s on -1x speed", () => {
    instance.handleSetMinute(9);

    jest.useFakeTimers();
    expect(wrapper.state("minute")).toBe(9);
    instance.initializeCountdown("-1X");
    jest.runOnlyPendingTimers(4000);
    expect(wrapper.state("minute")).toBe("08");
    expect(wrapper.state("second")).toBe("59");
  });

  test("terminateCountdown: should call clearinterval", () => {
    instance.handleSetMinute(9);

    jest.useFakeTimers();
    instance.terminateCountdown();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
