import React, { Component } from 'react';
import './index.css'

class MyButton extends Component {
  state = {
    disabled: this.props.disabled
  }
  render() {
    const disabled = this.state.disabled ? 'disabled' : ''
    return (
      <button id={this.props.id}
        type={this.props.type}
        className={this.props.primary ? 'mybutton' : 'mybutton-secondary'}
        onClick={this.props.static ? undefined : () => this.props.onClick()}
        {...disabled}>
        {this.props.text}
      </button>
    );
  }
}

export default MyButton;