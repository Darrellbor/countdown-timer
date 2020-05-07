import React, { Component } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

class Countdown extends Component {
  state = {
    count: 0,
  };

  handleSetCount = (count) => {
    this.setState({ count });
  };

  render() {
    return (
      <div className="Countdown">
        <Header />
        <Footer onStart={(count) => this.handleSetCount(count)} />
      </div>
    );
  }
}

export default Countdown;
