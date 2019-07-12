const hue = require('node-hue-api');
const HueApi = require('node-hue-api').HueApi;
const express = require('express');


// Request for bridge IP

module.exports = function (app) {
  app.post('/', (req, res) => {
    hue.nupnpSearch(function (err, result) {
      if (err) throw err;
      res.json(result);
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
    });
  })

  // Once this connection is established, requests can then be made to trigger light events.

  app.post('/lights', (req, res) => {
    const lightState = hue.lightState;
    let host = req.body.host;
    let username = req.body.username;
    let api = new HueApi(host, username);
    if (req.body.huestate === 'on') {
      let state = lightState.create().on();
      api.setLightState(5, state, function (err, lights) {
        if (err) throw err;
        res.json(lights)
      });
    } else {
      let state = lightState.create().off();
      api.setLightState(5, state, function (err, lights) {
        if (err) throw err;
        res.json(lights)
      });
    }
  })
}


