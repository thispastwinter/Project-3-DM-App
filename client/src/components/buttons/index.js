import React, { Component } from 'react';
import './index.css'

class MyButton extends Component {
  state = {  }
  render() { 
    return ( 
      <button className={this.props.primary ? 'mybutton' : 'mybutton-secondary' } onClick={'' ? null : () => this.props.onClick()}>{this.props.text}</button>
     );
  }
}
 
export default MyButton;