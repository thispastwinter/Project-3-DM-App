const hue = require('node-hue-api');
const HueApi = require('node-hue-api').HueApi;
const express = require('express');

// Request for bridge IP

module.exports = function (app) {
  app.post('/', (req, res) => {
    hue.nupnpSearch(function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.json(result[0].ipaddress);
      } else {
        res.send('')
      }
    })
  })

  // Request to connect to the bridge
  // Generates a unique user token

  app.post('/connect', (req, res) => {
    let host = req.body.host;
    let newApi = new HueApi();
    newApi.createUser(host, function (err, user) {
      if (err) throw err;
      res.json(user);
    })
  })

  // get all lights

  app.post('/alllights', (req, res) => {
    let host = req.body.host;
    let user = req.body.user;
    let api = new HueApi(host, user);
    api.getConfig(function (err, config) {
      if (err) throw err;
      res.json(config);
    });
  })

  // Once this connection is established, requests can then be made to trigger light events.

  app.post('/lights', (req, res) => {
    const lightState = hue.lightState;
    let host = req.body.host;
    let username = req.body.username;
    let api = new HueApi(host, username);
    let state;
    switch (req.body.huestate) {
      case 'on':
        state = lightState.create().on();
        api.setLightState(5, state, function (err, lights) {
          if (err) throw err;
          res.json(lights)
        });
        break;
      case 'off':
        state = lightState.create().off();
        api.setLightState(5, state, function (err, lights) {
          if (err) throw err;
          res.json(lights)
        });
        break;
      case 'critical':
        state = lightState.create().longAlert();
        api.setLightState(5, state, function (err, lights) {
          if (err) throw err;
          res.json(lights)
        });
        break;
      default:
        state = lightState.create().on();
        api.setLightState(5, state, function (err, lights) {
          if (err) throw err;
          res.json(lights)
        });
    }
  })
}


