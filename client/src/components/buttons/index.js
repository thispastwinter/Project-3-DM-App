import React, { Component } from 'react';
import './index.css'

class MyButton extends Component {
  state = {
  }
  render() {
    return (
      <button id="this.props.id"
        className={this.props.primary ? 'mybutton' : 'mybutton-secondary'}
        onClick={this.props.disabled ? undefined : () => this.props.onClick()}>
        {this.props.text}
      </button>
    );
  }
}

export default MyButton;