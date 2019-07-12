import React, { Component } from 'react';


class Lights extends Component {
  render() { 
    return (
      <div>
        <button onClick={this.props.function}>{this.props.text}</button>
      </div>
      );
  }
}
 
export default Lights;