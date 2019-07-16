import React, { Component } from 'react';
import { Container } from 'react-bulma-components';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Hue from './components/hue';
import axios from 'axios';
import List from './components/list/index';
import ListItem from './components/listItem/index';
import characterList from './characters.json';
import socketIOClient from 'socket.io-client';

// Create a Connect to Hue button that sends the ip to a createUser post request 
// Text that informs user to hold the link button when pressing connect

class App extends Component {
  state = {
    ip: [],
    user: '',
    lights: [],
    lightId: [],
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
      });
  };

  findAllLights = () => {
    axios.post('/allLights', {
      host: this.state.ip,
      user: this.state.user
    }).then(res => {
      console.log(res.data)
      let lights = res.data.lights.map(lights => lights.name);
      let lightId = res.data.lights.map(lights => lights.id);
      this.setState({ lights });
      this.setState({ lightId })
    });

  };

  handleChange = (event) => {
    this.setState({ selectedLight: event.target.value })
  };

  lightOn = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'on',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      });
  };

  lightOff = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'off',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      });
  };

  criticalRoll = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'critical',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      });
  };

  lightning = () => {
    axios.post('/lights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'lightning',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      });
  };

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
        <br></br>
        <Container id="hue-box">
          <h1>Hue Lights</h1>
          {this.state.ip.length > 0 ?
            <div>
              <h4>Select a Light:</h4>
              <select onChange={this.handleChange} value={this.state.selectedLight}>
                {this.state.lights.map((lights, index) => (
                  <option value={this.state.lightId[index]} key={this.state.lightId[index]}>{lights}</option>
                ))}
              </select>
              <Hue
                lightOn={this.lightOn}
                lightOff={this.lightOff}
                critical={this.criticalRoll}
                lightning={this.lightning}
                connection={this.connectionHandler}>
              </Hue></div> : 'No Bridge Found'}
        </Container>
      </div>
    );
  }
}

export default App;