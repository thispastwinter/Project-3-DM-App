import React, { Component } from 'react';
import { Heading, Columns } from 'react-bulma-components';
import Lights from '../../components/lights';
import axios from 'axios';
import './index.css';
import NavTabs from "../../components/navTabs";

class HuePage extends Component {
  state = {
    ip: [],
    user: '',
    lights: [],
    lightId: [],
    selectedLight: [],
  }

  componentDidMount() {
    axios.post('/api/v1/huelights/detect')
      .then(res => {
        console.log(res.data)
        let ip = res.data;
        this.setState({ ip });
      });

    window.addEventListener("beforeunload", this.onUnload);
    const stateObject = JSON.parse(localStorage.getItem("state"));
    this.setState(stateObject);

  }

  onUnload = (event) => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  connectionHandler = () => {
    axios.post('/api/v1/huelights/connect', {
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
      <React.Fragment>
        <NavTabs />
        <Columns.Column>
          <Columns id="hue-box">
            <Heading className="title-1">Hue Lights</Heading>
            {this.state.ip.length > 0 ?
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
                </Lights></div> : 'No Bridge Found'}
          </Columns>
        </Columns.Column>
      </React.Fragment>
    );
  }
}

export default HuePage;