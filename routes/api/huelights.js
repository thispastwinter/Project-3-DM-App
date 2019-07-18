const hue = require('node-hue-api');
const HueApi = require('node-hue-api').HueApi;
const express = require('express');
require('../../light_effects/lightning');

// Request for bridge IP

const hueLights = () => {
  app.post('/ip', (req, res) => {
    hue.nupnpSearch(function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.json(result[0].ipaddress);
      } else {
        res.send('')
      };
    });
  });

  // Request to connect to the bridge
  // Generates a unique user token

  app.post('/connect', (req, res) => {
    let host = req.body.host;
    let newApi = new HueApi();
    newApi.createUser(host, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  });

  // get all lights

  app.post('/alllights', (req, res) => {
    let host = req.body.host;
    let user = req.body.user;
    let api = new HueApi(host, user);
    api.lights(function (err, lights) {
      if (err) throw err;
      res.json(lights);
    });
  });

  // Once this connection is established, requests can then be made to trigger light events.

  app.post('/lights', (req, res) => {
    
};

module.exports = hueLights;

