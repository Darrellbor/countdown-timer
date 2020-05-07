import React, { Component } from "react";

//components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Controls from "../../components/Controls";

//icons
import Pause from "../../components/Icons/pause";

class Countdown extends Component {
  state = {
    minute: 0,
    second: 0,
    clicked: "None",
  };

  handleSetMinute = (minute) => {
    this.setState({ minute });
  };

  handleOnPauseClick = () => {
    this.setState({ clicked: "Pause" });

    setTimeout(() => {
      this.setState({ clicked: "None" });
    }, 1000);
  };

  render() {
    return (
      <div className="Countdown">
        <Header />
        <Controls
          icon={<Pause />}
          hoverIcon={<Pause hover={true} />}
          text="Pause Counter"
          textPos="right"
          controlClicked={this.state.clicked === "Pause"}
          onClick={() => this.handleOnPauseClick()}
        />
        <Footer onStart={(minute) => this.handleSetMinute(minute)} />
      </div>
    );
  }
}

export default Countdown;
