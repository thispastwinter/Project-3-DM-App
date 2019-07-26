import React, { Component } from 'react';
import { Heading, Columns, Button } from 'react-bulma-components';
import Lights from '../../components/lights';
import axios from 'axios';
import './index.css';

class HuePage extends Component {
  state = {
    ip: [],
    user: '',
    lights: [],
    lightId: [],
    selectedLight: [],
    loggedIn: false,
    access_token: '',
    refreshToken: ''
  }

  componentDidMount() {
    const url = window.location.href;
    if (url.includes('code')) {
      const code = url.split('code=')[1].split('&state=none')[0]; //.com/?
      const hueState = url.split('&state=')[1];
      this.setState({ loggedIn: hueState })
      axios.post('/api/v1/huelights/connect', {
        code: code
      }).then(res => {
        const accessToken = res.data.access_token;
        console.log(accessToken);
        const refreshToken = res.data.refresh_token;
        console.log(refreshToken)
        this.setState({ access_token: accessToken });
        this.setState({ refresh_token: refreshToken });
      }).catch(err => {
        console.log(err);
      })
    }

  //   window.addEventListener("beforeunload", this.onUnload);
  //   const stateObject = JSON.parse(localStorage.getItem("state"));
  //   this.setState(stateObject);


  // }
  // onUnload = (event) => {
  //   localStorage.setItem("state", JSON.stringify(this.state));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.onUnload)
  // }
  }
  // All secure information must be store in backend, including access tokens. Look in express-session for potential local storage options.

  redirect = () => {
    axios.get('/api/v1/huelights/url').then(res => {
      const url = res.data; 
      console.log(url); 
      window.location.href = url;
    }).catch(err => {console.log(err)});
  };

  // Put request, followed by post, followed by getting all available lights
  // This isn't ideal, tokens need to be stored server side for best security. 

  connectionHandler = () => {
    const accessToken = this.state.access_token;
    console.log(accessToken)
    axios.post('/api/v1/huelights/bridge', {
      accessToken: accessToken
    }).then(res => console.log(res)).catch(err => console.log(err))
  };

  findAllLights = () => {
    axios.post('/api/v1/huelights/alllights', {
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
    axios.post('/api/v1/huelights/controllights', {
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
    axios.post('/api/v1/huelights/controllights', {
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
    axios.post('/api/v1/huelights/controllights', {
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
    axios.post('/api/v1/huelights/controllights', {
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
      <Columns.Column>
        <Columns id="hue-box">
          <Heading className="title-1">Hue Lights</Heading>
          {this.state.loggedIn ?
            <div>
              <Heading className="title-2" size={5}>Select a Light:</Heading>
              <div className="select">
                <select onChange={this.handleChange} value={this.state.selectedLight}>
                  {this.state.lights.map((lights, index) => (
                    <option value={this.state.lightId[index]} key={this.state.lightId[index]}>{lights}</option>
                  ))}
                </select>
              </div>
              <Lights
                lightOn={this.lightOn}
                lightOff={this.lightOff}
                critical={this.criticalRoll}
                lightning={this.lightning}
                connection={this.connectionHandler}>
              </Lights></div> : <div><Button onClick={this.redirect}>Connect To Hue</Button></div>}
        </Columns>
      </Columns.Column>
    );
  }
}

export default HuePage;