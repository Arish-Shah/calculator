import React, { Component } from 'react';

import Display from './Display/Display';
import Panel from './Panel/Panel'
import './Calculator.css';

class Calculator extends Component {
  state = {
    firstNumber: 0,
    secondNumber: 0,
    operator: null,
    operatorSet: false,
    displayNumber: "0",
    temporaryNumber: null
  }

  clickedHandler = (text, type) => {
    switch (type) {
      case 'C': this.clear();
        break;
      case 'number': this.numberHandler(text);
        break;
      case 'plus/minus': this.plusMinusHandler();
        break;
      case 'dot': this.decimalHandler();
        break;
      case 'operator': this.operatorHandler(text);
        break;
      case 'equals': this.calculate();
        break;
      default: console.log('unknown button pressed');
    }
    if (this.state.operatorSet) {
      this.setState({ temporaryNumber: null });
    }
    //console.log(this.state);
  }

  clear = () => {
    this.setState({
      firstNumber: 0,
      secondNumber: 0,
      operator: null,
      operatorSet: false,
      displayNumber: "0"
    });
  }

  numberHandler = (passedNumber) => {
    //Checking if the display number is empty
    let displayNumber = this.state.displayNumber;
    if (displayNumber === "0") {
      displayNumber = "";
    }
    //Concatenating new number, converting  it and storing it
    displayNumber += passedNumber;
    let number = parseFloat(displayNumber);

    //Setting states
    this.state.operatorSet ? this.setState({ secondNumber: number }) : this.setState({ firstNumber: number });
    this.setState({ displayNumber: displayNumber });
  }

  plusMinusHandler = () => {
    let displayNumber = this.state.displayNumber;

    //Checking if the number is already negative or not
    if (displayNumber.substr(0, 1) === '-') {
      displayNumber = displayNumber.substr(1);
    } else {
      displayNumber = '-' + displayNumber;
    }
    let number = parseFloat(displayNumber);

    //Setting states
    this.state.operatorSet ? this.setState({ secondNumber: number }) : this.setState({ firstNumber: number });
    this.setState({ displayNumber: displayNumber });
  }

  decimalHandler = () => {
    let displayNumber = this.state.displayNumber;
    let index = displayNumber.indexOf('.', 0);

    if (index === -1) {
      displayNumber += '.';
    }

    this.setState({ displayNumber: displayNumber });
  }

  operatorHandler = (text) => {
    if (this.state.operatorSet) {
      this.calculate();
      this.setState({
        displayNumber: this.state.firstNumber
      });
    } else {
      this.setState({
        temporaryNumber: this.state.firstNumber
      });
    }

    this.setState({
      operatorSet: true,
      operator: text,
      displayNumber: "0",
    });
  }

  calculate = () => {
    let result = 0;

    switch (this.state.operator) {
      case '+': result = this.state.firstNumber + this.state.secondNumber;
        break;
      case '-': result = this.state.firstNumber - this.state.secondNumber;
        break;
      case '×': result = this.state.firstNumber * this.state.secondNumber;
        break;
      case '÷': result = this.state.firstNumber / this.state.secondNumber;
        break;
      default: console.log('Unknown Operator');
    }
    //Fix .3337 to 2 decimal places if it exists
    if (result % 1 !== 0) {
      result = result.toFixed(2);
    }

    let displayNumber = "" + result;

    this.setState({
      firstNumber: result,
      secondNumber: 0,
      operator: null,
      operatorSet: false,
      displayNumber: displayNumber
    });
  }

  render() {
    let number = this.state.temporaryNumber || this.state.displayNumber;

    return (
      <div className="Calculator">
        <Display number={number} operator={this.state.operator} />
        <Panel clicked={this.clickedHandler} />
      </div>
    );
  }
}

export default Calculator;