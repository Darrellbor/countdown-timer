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

  componentDidMount() {
    setInterval(() => {
      this.setState({ second: this.state.second * 1 + 1 });
    }, 1000);
  }

  handleSetMinute = (minute) => {
    this.setState({ minute });
  };

  handleOnPauseClick = () => {
    this.setState({ clicked: "Pause", activeControl: "Paused" });

    setTimeout(() => {
      this.setState({ clicked: "None" });
    }, 1000);
  };

  handleOnPlayClick = () => {
    this.setState({ clicked: "Play", activeControl: "Played" });

    setTimeout(() => {
      this.setState({ clicked: "None" });
    }, 1000);
  };

  handleOnStopClick = () => {
    this.setState({ clicked: "Stop", activeControl: "Stoped" });

    setTimeout(() => {
      this.setState({ clicked: "None" });
    }, 1000);
  };

  handleOnSwitchSpeed = (speed) => {
    this.setState({ speedClicked: speed, activeSpeed: speed });

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

        <Header />
        <div className="Countdown__body">
          <div className="Countdown__main">
            <div className="Countdown__main__left">
              <Controls
                icon={<Stop />}
                hoverIcon={<Stop hover={true} />}
                text="Stop/reset"
                controlClicked={this.state.clicked === "Stop"}
                onClick={() => this.handleOnStopClick()}
              />
            </div>
            <div className="Countdown__main__center">
              <Counter
                minute={this.state.minute}
                second={this.state.second}
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
