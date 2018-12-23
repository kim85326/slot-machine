import React, { Component } from "react";
import "./Slot.css";

class Slot extends Component {
  constructor() {
    super();
    this.state = {
      currentDeg: 0
    };
    this.start = this.start.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config.isRunning && !this.props.config.isRunning) {
      this.start();
    }
  }

  getStyle() {
    const style = {
      transform: `rotateX(${this.state.currentDeg}deg)`
    };

    if (this.props.config.isRunning) {
      style.transition = `${this.props.config.durationTime}ms ease-in-out`;
    }

    return style;
  }

  getSlotItems() {
    const slotItems = [];

    for (const index in this.props.config.items) {
      const item = this.props.config.items[index];
      const itemStyle = {
        transform: `rotateX(${this.getItemRotate() * index}deg)
          translateZ(${this.getItemTranslateZ()}px)`
      };

      slotItems.push(
        <div key={index} className="slot-item" style={itemStyle}>
          {item}
        </div>
      );
    }

    return slotItems;
  }

  getItemRotate() {
    return 360 / this.props.config.items.length;
  }

  getItemTranslateZ() {
    return 150 / 2 / Math.tan((this.getItemRotate() / 2 / 180) * Math.PI);
  }

  start() {
    // 取得隨機角度(預設至少跑5圈)
    let randomDeg = Math.random() * 360 + 360 * 5;
    randomDeg -= randomDeg % this.getItemRotate(); // 減去餘數，避免有高低不一的狀況
    this.setState({
      currentDeg: -randomDeg
    });
    setTimeout(() => {
      this.stop();
    }, this.props.config.durationTime);
  }

  stop() {
    // 把結束時的角度設定為當前角度
    const currentDeg = this.state.currentDeg % 360;
    this.setState(
      {
        currentDeg: currentDeg
      },
      this.props.stop
    );
  }

  render() {
    return (
      <div className="slot" style={this.getStyle()}>
        {this.getSlotItems()}
      </div>
    );
  }
}

export default Slot;
