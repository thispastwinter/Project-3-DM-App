const hue = require('node-hue-api');
const { HueApi } = require('node-hue-api');
const express = require('express');
require('../../light_effects/lightning');

// Request for bridge IP

module.exports = function (app) {
  app.post('/', (req, res) => {
    hue.nupnpSearch((err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json(result[0].ipaddress);
      } else {
        res.send('');
      }
    });
  });

  // Request to connect to the bridge
  // Generates a unique user token

  app.post('/connect', (req, res) => {
    const { host } = req.body;
    const newApi = new HueApi();
    newApi.createUser(host, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  });

  // get all lights

  app.post('/alllights', (req, res) => {
    const { host } = req.body;
    const { user } = req.body;
    const api = new HueApi(host, user);
    api.lights((err, lights) => {
      if (err) throw err;
      res.json(lights);
    });
  });

  // Once this connection is established, requests can then be made to trigger light events.

  app.post('/lights', (req, res) => {
    const { lightState } = hue;
    const { host } = req.body;
    const { username } = req.body;
    const { light } = req.body;
    const api = new HueApi(host, username);
    let state;
    switch (req.body.huestate) {
      case 'on':
        state = lightState.create().on();
        api.setLightState(light, state, (err, lights) => {
          if (err) throw err;
          res.json(lights);
        });
        break;
      case 'off':
        state = lightState.create().off();
        api.setLightState(light, state, (err, lights) => {
          if (err) throw err;
          res.json(lights);
        });
        break;
      case 'critical':
        state = lightState.create().longAlert();
        api.setLightState(light, state, (err, lights) => {
          if (err) throw err;
          res.json(lights);
        });
        break;
      case 'lightning':
        lightning(api, light);
        break;
      default:
        state = lightState.create().on();
        api.setLightState(light, state, (err, lights) => {
          if (err) throw err;
          res.json(lights);
        });
    }
  });
};
