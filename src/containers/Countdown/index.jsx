import React, { Component } from "react";

//components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Controls from "../../components/Controls";
import SpeedControls from "../../components/SpeedControls";
import Alert from "../../components/Alert";
import Counter from "../../components/Counter";
import ThemeController from "../../components/ThemeController";

//icons
import Pause from "../../components/Icons/Pause";
import Play from "../../components/Icons/Play";
import Stop from "../../components/Icons/Stop";

//sound
import CountdownOverSound from "../../assets/sounds/countdown-complete.mp3";

class Countdown extends Component {
  state = {
    theme: "Dark",
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

  componentDidMount() {
    this.initializeTheme();
  }

  initializeTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) this.setState({ theme });
    else localStorage.setItem("theme", "Dark");
  };

  handleSetThemeColor = (event) => {
    const theme = event.target.dataset.setthemeto;
    this.setState({ theme });
    localStorage.removeItem("theme");
    localStorage.setItem("theme", theme);
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
      timerSpeed = 1500;
    } else if (speed === "-1X") {
      timerSpeed = 2000;
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
        if (second - 1.5 <= 0) {
          second = "58";
          minute -= 1;

          if (minute < 0) {
            this.setTimedOut();
            this.terminateCountdown();
            return;
          }
        } else {
          second = Math.floor(second - 1.5);
        }
      } else if (state.activeSpeed === "2X") {
        //check for less than 0 second
        if (second - 2 <= 0) {
          second = "59";
          minute -= 1;

          if (minute < 0) {
            this.setTimedOut();
            this.terminateCountdown();
            return;
          }
        } else {
          second -= 2;
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
  };

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
    if (this.state.minute !== "00" || this.state.second !== "00") {
      this.setState({ clicked: "Pause", activeControl: "Paused" });

      this.terminateCountdown();

      setTimeout(() => {
        this.setState({
          clicked: "None",
          isAlertOpen: true,
          alertContent: "Timer Paused",
        });
      }, 1000);
    } else {
      this.setState({ clicked: "Pause" });

      setTimeout(() => {
        this.setState({
          clicked: "None",
        });
      }, 1000);
    }
  };

  handleOnPlayClick = () => {
    this.setState({ clicked: "Play", activeControl: "Played" });

    this.initializeCountdown(this.state.activeSpeed, true);

    setTimeout(() => {
      this.setState({ clicked: "None", isAlertOpen: false });
    }, 1000);
  };

  handleOnStopClick = () => {
    if (this.state.minute !== "00" || this.state.second !== "00") {
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
    } else {
      this.setState({ clicked: "Stop" });

      setTimeout(() => {
        this.setState({
          clicked: "None",
        });
      }, 1000);
    }
  };

  handleOnSwitchSpeed = (speed) => {
    if (
      (this.state.minute !== "00" || this.state.second !== "00") &&
      this.state.activeControl !== "Paused"
    ) {
      this.setState({ speedClicked: speed, activeSpeed: speed });

      this.terminateCountdown();
      this.initializeCountdown(speed, true);

      setTimeout(() => {
        this.setState({ speedClicked: "None" });
      }, 1000);
    } else {
      this.setState({ speedClicked: speed, activeSpeed: speed });

      setTimeout(() => {
        this.setState({ speedClicked: "None" });
      }, 1000);
    }
  };

  render() {
    return (
      <div className="Countdown">
        <Alert
          isOpen={this.state.isAlertOpen}
          isTimeUp={this.state.isTimeUp}
          theme={this.state.theme}
        >
          {this.state.alertContent}
        </Alert>

        <ThemeController
          theme={this.state.theme}
          onClick={(event) => this.handleSetThemeColor(event)}
        />

        {this.state.isTimeUp && (
          <audio src={CountdownOverSound} controls autoPlay hidden>
            <source src={CountdownOverSound} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}

        <Header theme={this.state.theme} />
        <div
          className={`Countdown__body ${
            this.state.theme === "Dark" && "Countdown__body--dark"
          }`}
        >
          <div className="Countdown__main">
            <div className="Countdown__main__left">
              <Controls
                theme={this.state.theme}
                icon={<Stop theme={this.state.theme} />}
                hoverIcon={<Stop theme={this.state.theme} hover={true} />}
                text="Stop/reset"
                textPos="left"
                controlClicked={this.state.clicked === "Stop"}
                onClick={() => this.handleOnStopClick()}
              />
            </div>
            <div className="Countdown__main__center">
              <Counter
                theme={this.state.theme}
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
                  theme={this.state.theme}
                  icon={<Play theme={this.state.theme} />}
                  hoverIcon={<Play theme={this.state.theme} hover={true} />}
                  text="Resume"
                  controlClicked={this.state.clicked === "Play"}
                  onClick={() => this.handleOnPlayClick()}
                />
              ) : (
                <Controls
                  theme={this.state.theme}
                  icon={<Pause theme={this.state.theme} />}
                  hoverIcon={<Pause theme={this.state.theme} hover={true} />}
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
                theme={this.state.theme}
                controlClicked={this.state.speedClicked === "1X"}
                active={this.state.activeSpeed === "1X"}
                onClick={() => this.handleOnSwitchSpeed("1X")}
              >
                1X
              </SpeedControls>

              <SpeedControls
                theme={this.state.theme}
                controlClicked={this.state.speedClicked === "1.5X"}
                active={this.state.activeSpeed === "1.5X"}
                onClick={() => this.handleOnSwitchSpeed("1.5X")}
              >
                1.5X
              </SpeedControls>

              <SpeedControls
                theme={this.state.theme}
                controlClicked={this.state.speedClicked === "2X"}
                active={this.state.activeSpeed === "2X"}
                onClick={() => this.handleOnSwitchSpeed("2X")}
              >
                2X
              </SpeedControls>

              <SpeedControls
                theme={this.state.theme}
                controlClicked={this.state.speedClicked === "0.5X"}
                active={this.state.activeSpeed === "0.5X"}
                onClick={() => this.handleOnSwitchSpeed("0.5X")}
              >
                0.5X
              </SpeedControls>

              <SpeedControls
                theme={this.state.theme}
                controlClicked={this.state.speedClicked === "-1X"}
                active={this.state.activeSpeed === "-1X"}
                onClick={() => this.handleOnSwitchSpeed("-1X")}
              >
                - 1X
              </SpeedControls>
            </div>
          </div>
        </div>
        <Footer
          theme={this.state.theme}
          onStart={(minute) => this.handleSetMinute(minute)}
        />
      </div>
    );
  }
}

export default Countdown;
