const hue = require('node-hue-api');
const HueApi = require('node-hue-api').HueApi;
const express = require('express');
require('../light_effects/lightning');

const connect = (req, res) => {
hue.nupnpSearch(function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.json(result[0].ipaddress);
      } else {
        res.send('')
      };
    });
};

exports.connect = connect;
