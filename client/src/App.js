import React, { Component } from 'react';
import './App.css';
import Lights from './components/lights'
import axios from 'axios';

// Create a Connect to Hue button that sends the ip to a createUser post request 
// Text that informs user to hold the link button when pressing connect

class App extends Component {
  state = {
    ip: [],
    user: '',
    choices: ['one', 'two', 'three'],
    lights
  }

  componentDidMount() {
    axios.post('/')
      .then(res => {
        let ip = res.data;
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
        this.findAllLights();
      }).catch(function (error) {
        if (error) alert('Make sure to hold bridge link when connecting!')
      })
  }

  findAllLights = () => {
    axios.post('/allLights', {
      host: this.state.ip,
      user: this.state.user
    }).then(res => {
      let lights = res.data
      this.setState({ lights })
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

  criticalRoll = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'critical'
    })
      .then(res => {
        console.log(res);
      })
  }

  // .map array method to populate light dropdown with all available lights
  // On change event to change 'light' selected and update state accordingly

  render() {
    return (
      <div>
        <h1>Hue Lights</h1>
        <h4>Select a Light:</h4>
        <select>
        {this.state.choices.map(options => (
          <option>{options}</option>
        ))}
        </select>
        <hr></hr>
        <Lights function={() => this.lightOn()} text="Light On">
        </Lights>
        <Lights function={() => this.lightOff()} text="Light Off">
        </Lights>
        <Lights function={() => this.criticalRoll()} text="Critical Roll">
        </Lights>
        <Lights function={() => this.candleLight()} text="Candlelight">
        </Lights>
        <Lights function={() => this.lightning()} text="Lightning">
        </Lights>
        <p>Bridge Status: {this.state.ip.length > 0 ? 'Bridge Found!' : 'No Bridge Found!'}</p>
        <p>{this.state.ip.length > 0 ? `Your Bridge IP: ${this.state.ip}` : ``}</p>
        <button onClick={() => this.connectionHandler()}>Connect to Hue!</button>
      </div>
    );
  }
}

export default App;
