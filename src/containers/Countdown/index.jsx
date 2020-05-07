import React, { Component } from "react";

//components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Controls from "../../components/Controls";
import SpeedControls from "../../components/SpeedControls";
import Alert from "../../components/Alert";

//icons
import Pause from "../../components/Icons/pause";

class Countdown extends Component {
  state = {
    minute: 0,
    second: 0,
    clicked: "None",
    speedClicked: "None",
    activeControl: "None",
    activeSpeed: "1X",
    isAlertOpen: false,
    alertContent: "Welcome",
    isTimeUp: false,
  };

  handleSetMinute = (minute) => {
    this.setState({ minute });
  };

  handleOnPauseClick = () => {
    this.setState({ clicked: "Pause", activeControl: "Paused" });

    setTimeout(() => {
      this.setState({ clicked: "None" });
    }, 1000);
  };

  handleOnSwitchSpeed = (speed) => {
    this.setState({ speedClicked: speed, activeSpeed: speed });

    setTimeout(() => {
      this.setState({ speedClicked: "None", isAlertOpen: !this.state.isAlertOpen });
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
          <Controls
            icon={<Pause />}
            hoverIcon={<Pause hover={true} />}
            text="Pause Counter"
            controlClicked={this.state.clicked === "Pause"}
            onClick={() => this.handleOnPauseClick()}
          />
          <SpeedControls
            controlClicked={this.state.speedClicked === "1X"}
            active={this.state.activeSpeed === "1X"}
            onClick={() => this.handleOnSwitchSpeed("1X")}
          >
            1X
          </SpeedControls>
        </div>
        <Footer onStart={(minute) => this.handleSetMinute(minute)} />
      </div>
    );
  }
}

export default Countdown;
