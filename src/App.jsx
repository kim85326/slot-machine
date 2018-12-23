import React, { Component } from "react";
import "./App.css";
import Slot from "./Slot";

class App extends Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
    this.state = {
      slotConfigs: [
        {
          isRunning: false,
          durationTime: 4000,
          items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          isRunning: false,
          durationTime: 5000,
          items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          isRunning: false,
          durationTime: 6000,
          items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      ],
      isHandlerActive: false
    };
  }

  startGame() {
    const { slotConfigs } = JSON.parse(JSON.stringify(this.state));

    for (const config of slotConfigs) {
      config.isRunning = true;
    }

    this.setState({
      slotConfigs: slotConfigs,
      isHandlerActive: true
    });

    setTimeout(() => {
      this.setState({
        isHandlerActive: false
      });
    }, 500);
  }

  stop(index) {
    const { slotConfigs } = JSON.parse(JSON.stringify(this.state));

    slotConfigs[index].isRunning = false;

    this.setState({
      slotConfigs: slotConfigs
    });
  }

  getIsRunning() {
    for (const config of this.state.slotConfigs) {
      if (config.isRunning === true) return true;
    }

    return false;
  }

  getSlots() {
    const slots = [];

    for (const index in this.state.slotConfigs) {
      const config = this.state.slotConfigs[index];
      slots.push(
        <Slot key={index} config={config} stop={this.stop.bind(this, index)} />
      );
    }

    return slots;
  }

  getHandlerActiveClassName() {
    if (this.state.isHandlerActive) {
      return " active";
    }
    return "";
  }

  render() {
    return (
      <div className="wrapper">
        <div className="slot-machine">
          <h1 className="slot-machine-header">Slot Machine</h1>
          <div className="slot-machine-body">
            <div className="screen">{this.getSlots()}</div>
          </div>
          <div className={`handler${this.getHandlerActiveClassName()}`}>
            <div className="horizontal-stick" />
            <div className="vertical-stick" />
            <button
              className="ball"
              onClick={this.startGame}
              disabled={this.getIsRunning()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
