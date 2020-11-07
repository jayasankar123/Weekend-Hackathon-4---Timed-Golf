import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      renderBall: false,
      ballPosition: { left: "0px", top: "0px" },
      timer: 0
    };
    this.renderChoice = this.renderChoice.bind(this);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleEventListener = this.handleEventListener.bind(this);
    this.intervalId = 0;
  }
  buttonClickHandler() {
    //console.log(this.state.renderBall);
    this.setState({ renderBall: true });
  }
  renderChoice() {
    if (this.state.renderBall) {
      return (
        <>
          <div className="ball" style={this.state.ballPosition}></div>
          <div className="hole"></div>
          <h2 className="heading-timer">{this.state.timer}</h2>
        </>
      );
    } else
      return (
        <button className="start" onClick={this.buttonClickHandler}>
          Start
        </button>
      );
  }
  handleEventListener(event) {
    if (event.key === "ArrowRight") {
      this.setState({
        x: this.state.x + 5,
        ballPosition: { left: `${this.state.x + 5}px`, top: this.state.y }
      });
      //console.log(event.key + " clicked");
    } else if (event.key === "ArrowLeft") {
      this.setState({
        x: this.state.x - 5,
        ballPosition: { left: `${this.state.x - 5}px`, top: this.state.y }
      });
      //console.log(event.key + " clicked");
    } else if (event.key === "ArrowUp") {
      this.setState({
        y: this.state.y - 5,
        ballPosition: { top: `${this.state.y - 5}px`, left: this.state.x }
      });
      //console.log(event.key + " clicked");
    } else if (event.key === "ArrowDown") {
      this.setState({
        y: this.state.y + 5,
        ballPosition: { top: `${this.state.y + 5}px`, left: this.state.x }
      });
      //console.log(event.key + " clicked");
    }
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.intervalId);
      console.log("reached destination");
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.renderBall) {
        this.setState({ timer: this.state.timer + 1 });
      }
    }, 1000);
    document.addEventListener("keydown", this.handleEventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEventListener);
  }

  render() {
    return <div>{this.renderChoice()}</div>;
  }
}

export default Timer;
