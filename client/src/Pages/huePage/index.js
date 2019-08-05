import React, { Component } from 'react';
import { Heading, Card } from 'react-bulma-components';
import Lights from '../../components/lights';
import axios from 'axios';
import './index.css';
import NavTabs from "../../components/navTabs";
import { Redirect } from 'react-router-dom';
import MyButton from '../../components/buttons'

class HuePage extends Component {
  state = {
    user: '',
    lights: [],
    lightId: [],
    isReachable: [],
    selectedLight: null,
    access_token: '',
    username: '',
    game_id: null,
    game_name: '',
    secret: '',
    redirect: false,
    expired: true
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    const stateObject = JSON.parse(localStorage.getItem("state"));
    this.setState(stateObject);
    this.loadGameId();
    this.checkForAuthCode();
  }

  checkForAuthCode = () => {
    const url = window.location.href;
    if (url.includes('code')) {
      const code = url.split('.com/hue?code=')[1].split('&state=none')[0]; 
      const hueState = url.split('&state=')[1];
      axios.post('/api/v1/huelights/connect', {
        code: code
      }).then(res => {
        const accessToken = res.data;
        console.log(res.data);
        this.setState({ access_token: accessToken });
        this.setState({ expired: false });
        this.setState({ redirect: hueState });
        localStorage.setItem("state", JSON.stringify(this.state));
        this.connectionHandler();
      }).catch(err => {
        console.log(err);
      })
    }
  }

  resetUrl = () => {
    if (this.state.redirect) {
      return <Redirect to='/hue' />
    }
  }

  onUnload = (event) => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  redirect = () => {
    axios.get('/api/v1/huelights/url').then(res => {
      const url = res.data;
      console.log(url);
      window.location.href = url;
    }).catch(err => { console.log(err) });
  };

  loadGameId = () => {
    let game_id = JSON.parse(localStorage.getItem("gameId"));
    let game_name = JSON.parse(localStorage.getItem("gameName"));
    let secret = JSON.parse(localStorage.getItem("gameSecret"));
    this.setState({ game_id, game_name, secret });
  }

  connectionHandler = () => {
    const accessToken = this.state.access_token;
    console.log(accessToken)
    axios.post('/api/v1/huelights/bridge', {
      accessToken: accessToken
    }).then(res => {
      const userName = res.data;
      this.setState({ username: userName })
      this.setState({ expired: false })
      this.findAllLights();
      console.log(res.data)
    }).catch(
      this.setState({ expired: true }))
  };

  findAllLights = () => {
    axios.post('/api/v1/huelights/alllights', {
      user: this.state.username,
      token: this.state.access_token
    }).then(res => {
      console.log(res.data)
      const lights = res.data.map(lights => lights[1].name)
      // I only want lights to be selectable if they are reachable
      const isReachable = res.data.map(lights => !lights[1].state.reachable) // Yields an inverted boolean to be passed into the <select> disabled value
      console.log(isReachable)
      const lightId = res.data.map(lights => lights[0]);
      console.log(lightId)
      console.log(lights);
      this.setState({ lights });
      this.setState({ lightId });
      this.setState({ isReachable })
    });

  };

  handleChange = (event) => {
    this.setState({ selectedLight: event.target.value })
  };

  lightOn = async (res, req) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'on'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  lightOff = async (res, req) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'off'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  lightning = async (res, req) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'lightning'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  criticalRoll = async (req, res) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'critical'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  fadeOut = async (res, req) => {
    try {
      axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'fadeOut'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  fadeIn = async (res, req) => {
    try {
      axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'fadeIn'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavTabs game_id={this.state.game_id} game_name={this.state.game_name} secret={this.state.secret} />
        <Heading className="title-1" size={1}>Lanterns</Heading>
        <Card id="huebox">
      
         
            {!this.state.expired ?
              <div>
                {this.resetUrl()}
                <div className="select" onClick={this.findAllLights}>
                  <select onChange={this.handleChange} value={this.state.selectedLight}>
                    <option selected="selected">Select A Light</option>
                    {this.state.lights.map((lights, index) => (
                      <option disabled={this.state.isReachable[index]} value={this.state.lightId[index]} key={this.state.lightId[index]}>{lights}</option>
                    ))}
                  </select>
                </div>
                <Lights
                  lightOn={this.lightOn}
                  lightOff={this.lightOff}
                  critical={this.criticalRoll}
                  fadeOut={this.fadeOut}
                  fadeIn={this.fadeIn}>
                </Lights></div> : <div><MyButton text="Connect To Hue" onClick={this.redirect}></MyButton></div>}
        
          </Card>
     
      </React.Fragment>
    );
  }
}

export default HuePage;
