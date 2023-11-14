import React, { Component } from 'react';
import './CalculatorStyle.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      prevValue: '',
      waitingForOperand: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDot = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
      });
    }
  };

  clearAll = () => {
    this.setState({
      displayValue: '0',
      operator: null,
      prevValue: '',
      waitingForOperand: false,
    });
  };

  toggleSign = () => {
    const { displayValue } = this.state;
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue,
    });
  };

  inputPercent = () => {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);
    this.setState({
      displayValue: String(value / 100),
      waitingForOperand: true,
    });
  };

  performOperation = (nextOperator) => {
    const { displayValue, operator, prevValue } = this.state;
    const inputValue = parseFloat(displayValue);

    if (prevValue && operator) {
      const computedValue = this.compute(prevValue, inputValue, operator);

      this.setState({
        displayValue: String(computedValue),
        prevValue: computedValue,
      });
    } else {
      this.setState({
        prevValue: inputValue,
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  compute = (a, b, operator) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  };

  handleEquals = () => {
    const { prevValue, displayValue, operator } = this.state;
    if (prevValue && operator) {
      const result = this.compute(prevValue, parseFloat(displayValue), operator);
      this.setState({
        displayValue: String(result),
        prevValue: '',
        operator: null,
      });
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <div className="calculator-display">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="key-clear" onClick={() => this.clearAll()}>
                AC
              </button>
              <button className="key-sign" onClick={() => this.toggleSign()}>
                ±
              </button>
              <button className="key-percent" onClick={() => this.inputPercent()}>
                %
              </button>
              <button className="key-operator" onClick={() => this.performOperation('/')}>
                ÷
              </button>
              <button className="key-operator" onClick={() => this.performOperation('*')}>
                ×
              </button>
              <button className="key-operator" onClick={() => this.performOperation('-')}>
                -
              </button>
              <button className="key-operator" onClick={() => this.performOperation('+')}>
                +
              </button>
            </div>
            <div className="digit-keys">
              <button className="key-0" onClick={() => this.inputDigit(0)}>
                0
              </button>
              <button className="key-dot" onClick={() => this.inputDot()}>
                .
              </button>
              <button className="key-1" onClick={() => this.inputDigit(1)}>
                1
              </button>
              <button className="key-2" onClick={() => this.inputDigit(2)}>
                2
              </button>
              <button className="key-3" onClick={() => this.inputDigit(3)}>
                3
              </button>
              <button className="key-4" onClick={() => this.inputDigit(4)}>
                4
              </button>
              <button className="key-5" onClick={() => this.inputDigit(5)}>
                5
              </button>
              <button className="key-6" onClick={() => this.inputDigit(6)}>
                6
              </button>
              <button className="key-7" onClick={() => this.inputDigit(7)}>
                7
              </button>
              <button className="key-8" onClick={() => this.inputDigit(8)}>
                8
              </button>
              <button className="key-9" onClick={() => this.inputDigit(9)}>
                9
              </button>
            </div>
          </div>
          <div className="equals-key">
            <button className="key-equals" onClick={() => this.handleEquals()}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
