import React, { Component } from 'react';
import './App.css';
import Lights from './components/lights'
import axios from 'axios';

// Create a Connect to Hue button that sends the ip to a createUser post request 
// Text that informs user to hold the link button when pressing connect

class App extends Component {
  state = {
    ip: [],
    user: ''
  }

  componentDidMount() {
    axios.post('/')
      .then(res => {
        let ip = res.data[0].ipaddress;
        this.setState({ ip });
      })
  }

  connectionHandler = () => {
    axios.post('/connect', {
      host: this.state.ip
    })
      .then(res => {
        console.log(res.data);
        let user = res.data;
        this.setState({ user })
      }).catch(function (error) {
        if (error) alert('Make sure to hold bridge link when connecting!')
      })
  }

  lightOn = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'on'
    })
    .then(res => {
      console.log(res);
    })
  }

  lightOff = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'off'
    })
    .then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>
      <Lights function={() => this.lightOn()} text="Turn Light On">
      </Lights>
      <Lights function={() => this.lightOff()} text="Turn Light Off">
      </Lights>
      <p>Bridge Status: {this.state.ip.length > 0 ? 'Bridge Found!' : 'No Bridge Found!' }</p>
      <p>{this.state.ip.length > 0 ? `Your Bridge IP: ${this.state.ip}` : ``}</p>
      <button onClick={() => this.connectionHandler()}>Connect to Hue!</button>
      </div>
    );
  }
}

export default App;
