import React, { Component } from 'react';
import './index.css'

class MyButton extends Component {
  state = {  }
  render() { 
    return ( 
      <button id="submit" className="mybutton" onClick={() => this.props.onClick()}>{this.props.text}</button>
     );
  }
}
 
export default MyButton;