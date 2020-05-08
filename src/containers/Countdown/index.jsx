import React, { Component } from "react";

//components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Controls from "../../components/Controls";
import SpeedControls from "../../components/SpeedControls";
import Alert from "../../components/Alert";
import Counter from "../../components/Counter";

//icons
import Pause from "../../components/Icons/pause";
import Play from "../../components/Icons/play";
import Stop from "../../components/Icons/stop";

//sound
import CountdownOverSound from "../../assets/sounds/countdown-complete.mp3";

class Countdown extends Component {
  state = {
    minute: "00",
    second: "00",
    halfMinute: "00",
    halfSecond: "00",
    clicked: "None",
    speedClicked: "None",
    activeControl: "None",
    activeSpeed: "1X",
    isAlertOpen: false,
    alertContent: "Welcome",
    isTimeUp: false,
    isTextBlinking: false,
    isTextRed: false,
  };

  handleSetMinute = (minute) => {
    this.resetCountdown(minute);
    this.terminateCountdown();

    setTimeout(() => {
      this.initializeCountdown();
    }, 600);
  };

  initializeCountdown = (speed = "1X", wasPaused = false) => {
    //set state and variables
    let state = this.state;
    let halfSecondExist = false;
    let halfMinute = 0;
    let timerSpeed = 1000;

    if (!wasPaused) {
      //check for half time
      if ((state.minute * 1) % 2 !== 0) halfSecondExist = true;

      if (state.minute === "1" || state.minute === 1) halfMinute = "00";
      else halfMinute = Math.floor((state.minute * 1) / 2);

      //setState
      this.setState({
        halfMinute,
        halfSecond: halfSecondExist ? "30" : "00",
      });
    }

    //check speed
    if (speed === "0.5X") {
      timerSpeed = 2000;
    } else if (speed === "-1X") {
      timerSpeed = 4000;
    }

    this.timer = setInterval(() => {
      //recall state each pass round
      state = this.state;

      //check for timeup
      if (
        (state.minute === "00" && state.second === "00") ||
        (state.minute * 1 <= 0 && state.second * 1 <= 0)
      ) {
        this.setTimedOut();
        this.terminateCountdown();
        return;
      }

      let minute = this.state.minute * 1;
      let second = this.state.second * 1;

      if (state.activeSpeed === "1.5X") {
        //check for less than 0 second
        if (second - 4 <= 0) {
          second = "58";
          minute -= 1;

          if (minute < 0) {
            this.setTimedOut();
            this.terminateCountdown();
            return;
          }
        } else {
          second -= 4;
        }
      } else if (state.activeSpeed === "2X") {
        //check for less than 0 second
        if (second - 6 <= 0) {
          second = "59";
          minute -= 1;

          if (minute < 0) {
            this.setTimedOut();
            this.terminateCountdown();
            return;
          }
        } else {
          second -= 6;
        }
      } else {
        //check for less than 0 second
        if (second <= 0) {
          second = "59";
          minute -= 1;
        } else {
          second -= 1;
        }
      }

      if (second < 10) {
        second = "0" + second;
      }

      if (minute < 10) {
        minute = "0" + minute;
      }

      //check for half time
      if (
        (minute * 1 <= state.halfMinute * 1 &&
          second * 1 <= state.halfSecond * 1) ||
        (state.halfSecond * 1 === 0 && minute * 1 < state.halfMinute * 1)
      ) {
        this.setState({
          isAlertOpen: true,
          alertContent: "More than halfway there!",
        });
      }

      //check for 20 seconds and less
      if (minute === "00" && second * 1 <= 20) {
        this.setState({ isTextRed: true });
      }

      //check for 10 seconds and less
      if (minute === "00" && second * 1 <= 10) {
        this.setState({ isTextBlinking: true });
      }

      this.setState({ minute, second });
    }, timerSpeed);
  };

  terminateCountdown = () => {
    clearInterval(this.timer);
  };

  setTimedOut = () => {
    this.setState({
      minute: "00",
      second: "00",
      isTimeUp: true,
      isAlertOpen: true,
      alertContent: "Time's Up!",
      isTextBlinking: false,
    });
  }

  resetCountdown = (minute = "00") => {
    this.setState({
      isAlertOpen: false,
      isTextRed: false,
      isTextBlinking: false,
      isTimeUp: false,
      activeControl: "None",
      activeSpeed: "1X",
      minute,
      second: "00",
    });
  };

  handleOnPauseClick = () => {
    this.setState({ clicked: "Pause", activeControl: "Paused" });

    this.terminateCountdown();

    setTimeout(() => {
      this.setState({
        clicked: "None",
        isAlertOpen: true,
        alertContent: "Timer Paused",
      });
    }, 1000);
  };

  handleOnPlayClick = () => {
    this.setState({ clicked: "Play", activeControl: "Played" });

    this.initializeCountdown(this.state.activeSpeed, true);

    setTimeout(() => {
      this.setState({ clicked: "None", isAlertOpen: false });
    }, 1000);
  };

  handleOnStopClick = () => {
    this.setState({ clicked: "Stop", activeControl: "Stoped" });

    this.terminateCountdown();
    this.resetCountdown();

    setTimeout(() => {
      this.setState({
        clicked: "None",
        isAlertOpen: true,
        alertContent: "Timer Stoped & cleared",
      });
    }, 1000);
  };

  handleOnSwitchSpeed = (speed) => {
    this.setState({ speedClicked: speed, activeSpeed: speed });

    this.terminateCountdown();
    this.initializeCountdown(speed, true);

    setTimeout(() => {
      this.setState({ speedClicked: "None" });
    }, 1000);
  };

  render() {
    return (
      <div className="Countdown">
        <Alert isOpen={this.state.isAlertOpen} isTimeUp={this.state.isTimeUp}>
          {this.state.alertContent}
        </Alert>

        {this.state.isTimeUp && (
          <audio src={CountdownOverSound} controls autoPlay hidden>
            <source src={CountdownOverSound} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}

        <Header />
        <div className="Countdown__body">
          <div className="Countdown__main">
            <div className="Countdown__main__left">
              <Controls
                icon={<Stop />}
                hoverIcon={<Stop hover={true} />}
                text="Stop/reset"
                textPos="left"
                controlClicked={this.state.clicked === "Stop"}
                onClick={() => this.handleOnStopClick()}
              />
            </div>
            <div className="Countdown__main__center">
              <Counter
                minute={this.state.minute}
                second={this.state.second}
                isPaused={this.state.activeControl === "Paused"}
                isTextRed={this.state.isTextRed}
                isTextBlinking={this.state.isTextBlinking}
                isTimeUp={this.state.isTimeUp}
              />
            </div>
            <div className="Countdown__main__right">
              {this.state.activeControl === "Paused" ? (
                <Controls
                  icon={<Play />}
                  hoverIcon={<Play hover={true} />}
                  text="Resume"
                  controlClicked={this.state.clicked === "Play"}
                  onClick={() => this.handleOnPlayClick()}
                />
              ) : (
                <Controls
                  icon={<Pause />}
                  hoverIcon={<Pause hover={true} />}
                  text="Pause"
                  controlClicked={this.state.clicked === "Pause"}
                  onClick={() => this.handleOnPauseClick()}
                />
              )}
            </div>
          </div>

          <div className="Countdown__speed">
            <h4>Speed Controls</h4>
            <div className="Countdown__speed__inner">
              <SpeedControls
                controlClicked={this.state.speedClicked === "1X"}
                active={this.state.activeSpeed === "1X"}
                onClick={() => this.handleOnSwitchSpeed("1X")}
              >
                1X
              </SpeedControls>

              <SpeedControls
                controlClicked={this.state.speedClicked === "1.5X"}
                active={this.state.activeSpeed === "1.5X"}
                onClick={() => this.handleOnSwitchSpeed("1.5X")}
              >
                1.5X
              </SpeedControls>

              <SpeedControls
                controlClicked={this.state.speedClicked === "2X"}
                active={this.state.activeSpeed === "2X"}
                onClick={() => this.handleOnSwitchSpeed("2X")}
              >
                2X
              </SpeedControls>

              <SpeedControls
                controlClicked={this.state.speedClicked === "0.5X"}
                active={this.state.activeSpeed === "0.5X"}
                onClick={() => this.handleOnSwitchSpeed("0.5X")}
              >
                0.5X
              </SpeedControls>

              <SpeedControls
                controlClicked={this.state.speedClicked === "-1X"}
                active={this.state.activeSpeed === "-1X"}
                onClick={() => this.handleOnSwitchSpeed("-1X")}
              >
                -1X
              </SpeedControls>
            </div>
          </div>
        </div>
        <Footer onStart={(minute) => this.handleSetMinute(minute)} />
      </div>
    );
  }
}

export default Countdown;
