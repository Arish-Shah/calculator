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
    displayNumber: '0',
    temporaryNumber: '0'
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
      case 'equals': this.calculate('equals');
        break;
      default: console.log('unknown button pressed');
    }
  }

  clear = () => {
    this.setState({
      firstNumber: 0,
      secondNumber: 0,
      operator: null,
      operatorSet: false,
      displayNumber: '0',
      temporaryNumber: '0'
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
    let tempNumber = this.state.displayNumber === '0' ? this.state.temporaryNumber : this.state.displayNumber;

    //Checking if the number is already negative or not
    if (tempNumber.substr(0, 1) === '-') {
      tempNumber = tempNumber.substr(1);
    } else {
      tempNumber = '-' + tempNumber;
    }
    let number = parseFloat(tempNumber);

    //Setting states
    this.state.operatorSet ? this.setState({ secondNumber: number }) : this.setState({ firstNumber: number });
    this.state.displayNumber === '0' ? this.setState({ temporaryNumber: tempNumber }) : this.setState({ displayNumber: tempNumber });
  }

  decimalHandler = () => {
    let displayNumber = this.state.displayNumber;
    let index = displayNumber.indexOf('.', 0);

    if (index === -1) {
      displayNumber += '.';
    }

    this.setState({ displayNumber: displayNumber });
  }

  operatorHandler = (passedOperator) => {
    if (passedOperator === '%') {
      this.percentageHandler();
    } else if (this.state.operatorSet) {
      if (this.state.secondNumber === 0) {
        this.setState({
          operator: passedOperator
        });
      } else {
        this.calculate('n0s');
        this.setState({ operator: passedOperator });
      }
    } else {
      this.setState({
        operator: passedOperator,
        operatorSet: true,
        displayNumber: '0',
        temporaryNumber: this.state.firstNumber
      });
    }
  }

  percentageHandler = () => {
    let number = (this.state.operatorSet ? this.state.secondNumber : this.state.firstNumber) / 100;

    this.state.operatorSet ?
      this.setState({
        secondNumber: number,
        displayNumber: "" + number
      }) :
      this.setState({
        firstNumber: number,
        secondNumber: 0,
        operator: null,
        operatorSet: false,
        displayNumber: "" + number
      });
  }

  calculate = (calculateType) => {
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
      default: result = this.state.firstNumber;
    }
    this.setResult(calculateType, result);
  }

  setResult = (calculateType, result) => {
    if (calculateType === 'equals') {
      this.setState({
        firstNumber: result,
        secondNumber: 0,
        operator: null,
        operatorSet: false,
        displayNumber: '0',
        temporaryNumber: '' + result
      });
    } else if (calculateType === 'n0s') {
      this.setState({
        firstNumber: result,
        secondNumber: 0,
        displayNumber: '0',
        temporaryNumber: '' + result
      });
    }
  }

  render() {
    let number = this.state.displayNumber === '0' ? this.state.temporaryNumber : this.state.displayNumber;

    return (
      <div className="Calculator">
        <Display number={number} operator={this.state.operator} />
        <Panel clicked={this.clickedHandler} />
      </div>
    );
  }
}

export default Calculator;