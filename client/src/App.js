import React, { Component } from 'react';
import './App.css';
import Lights from './components/lights'
import axios from 'axios';
import List from './components/list/index';
import ListItem from './components/listItem/index'
import characterList from './characters.json'
import socketIOClient from 'socket.io-client'

// Create a Connect to Hue button that sends the ip to a createUser post request 
// Text that informs user to hold the link button when pressing connect

class App extends Component {
  state = {
    ip: [],
    user: '',
    lights: [],
    selectedLight: [],
    characterList,
    endpoint: "localhost:3001"
  }

  componentDidMount() {
    axios.post('/')
      .then(res => {
        let ip = res.data;
        this.setState({ ip });
      });

    window.addEventListener("beforeunload", this.onUnload);
    const stateObject = JSON.parse(localStorage.getItem("state"));
    this.setState(stateObject);

    console.log(this.state.characterList);

    const socket = socketIOClient(this.state.endpoint);
    socket.on('listChange', (characterList) => {
      console.log('Change received');
      this.setState({ characterList });
    });
  }

  onUnload = (event) => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  send = async (func) => {
    await func
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('listChange', this.state.characterList)
    console.log('Sending List Change');
  }

  initSort = (array) => {
    const newArr = array.slice()
    newArr.sort((a, b) => {
      return b.init - a.init;
    });
    this.send(this.setState((state) => {
      return { characterList: newArr };
    }));
  }

  turnDone = (id) => {
    const characterList = this.state.characterList.slice();
    characterList.push(...characterList.splice(characterList.findIndex(c => c.id === id), 1))
    this.send(this.setState({ characterList }));
  }

  delayTurn = (id) => {
    const characterList = this.state.characterList.slice();
    const index = characterList.findIndex(c => c.id === id);
    if (index === (characterList.length - 1)) {
      let temp = characterList[index];
      characterList.pop();
      characterList.unshift(temp);
    }
    else {
      [characterList[index], characterList[index + 1]] = [characterList[index + 1], characterList[index]];
    }
    this.send(this.setState({ characterList }));
  }

  resetEncounter = () => {
    const characterList = this.state.characterList.slice();
    characterList.map(obj => {
      return obj.init = 0;
    });
    this.send(this.setState({ characterList }));
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
      console.log(res.data.swupdate.devicetypes.lights)
      let lights = res.data.swupdate.devicetypes.lights
      this.setState({ lights })
    })

  }

  handleChange = (event) => {
    this.setState({ selectedLight: event.target.value })
  }

  lightOn = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'on',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      })
  }

  lightOff = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'off',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      })
  }

  criticalRoll = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'critical',
      light: this.state.selectedLight
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
        <List >
          {this.state.characterList.map(character => (
            <ListItem
              id={character.id}
              key={character.id}
              init={character.init}
              name={character.name}
              image={character.image}
              turnDone={this.turnDone}
              delayTurn={this.delayTurn}
            />
          ))}
        </List>
        <button onClick={this.resetEncounter}>Reset Encounter</button>
        <button onClick={() => this.initSort(this.state.characterList)}>Initiative Sort</button>
        <h1>Hue Lights</h1>
        <h4>Select a Light:</h4>
        <select onChange={this.handleChange} value={this.state.selectedLight}>
          {this.state.lights.map(lights => (
            <option value={lights} key={lights}>{lights}</option>
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
