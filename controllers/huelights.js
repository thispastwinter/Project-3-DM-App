const express = require('express');
require('dotenv').config();
const hue = require('node-hue-api');
const HueApi = require('node-hue-api').HueApi;
const axios = require('axios');
// for Digest auth
const md5 = require('md5');
// for Basic auth
const base64 = require('base-64');
require('../light_effects/lightning');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// This get request is made, and redirects the user to the hue login page. It then asks them if they give permission for the app to use their acct.
// The user is then redirected and a code is received from as a reponse.
// This code will be given to the second request and used to trigger a 401 with a valid nonce key.
// Another request is made with the given header from Hue Developer Remote Page implementing the clientid, nonce key, and a calculated hashed response.

// I.E:

// Code for basic authentication:

// let config = {
//   method: 'POST',
//   url: 'https://api.meethue.com/oauth2/token?code=' + code + '&grant_type=authorization_code',
//   headers: {
//     Authorization: base64.encode(clientId + ':' + clientSecret)
//   }
// };

// The response will generate an auth token and a refresh token:

const sendUrl = async (req, res) => {
  try {
    const url = `https://api.meethue.com/oauth2/auth?clientid=${clientId}&appid=dmcompanion&deviceid=dm&state=true&response_type=code`;
    res.json(url);
  } catch (err) {
    console.log(err);
  }
}

const generateNonce = async (req, res, next) => {
  const code = req.body.code;
  try {
    const nonceSuccess = await axios.post(`https://api.meethue.com/oauth2/token?code=${code}&grant_type=authorization_code`);
    console.log('Nonce Success', nonceSuccess);
    console.log('Why do did we not get an error?');
    res.status(500).send(nonceSuccess);
  } catch (nonceFail) {
    req.nonce = nonceFail.response.headers['www-authenticate'].split(', ')[1].split('=')[1].replace(/['"]+/g, '');
    next();
  }
}

const generateAuthKeys = async (req, res) => {
  try {
    const { data: hueToken } = await axios({
      method: 'POST',
      url: `https://api.meethue.com/oauth2/token?code=${req.body.code}&grant_type=authorization_code`,
      headers: { Authorization: `Digest username="${clientId}", realm="oauth2_client@api.meethue.com", nonce="${req.nonce}", uri="/oauth2/token", response="${createHash(req.nonce)}"` }
    });
    res.send(hueToken.access_token);
    console.log(hueToken.access_token)
  } catch (err) {
    res.status(500).send(err);
  }
};

const createHash = (nonce) => {
  let hash1 = md5(clientId + ':' + 'oauth2_client@api.meethue.com' + ':' + clientSecret);
  let hash2 = md5('POST:/oauth2/token');
  let response = md5(hash1 + ':' + nonce + ':' + hash2);
  return (response);
}

const connectPart1 = async (req, res, next) => {
  const accessToken = req.body.accessToken;
  try {
    const { data: linkbutton } = await axios({
      method: 'PUT',
      url: 'https://api.meethue.com/bridge/0/config',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: { linkbutton: true }
    });
    req.token = accessToken;
    return next();
  } catch (err) {
    console.log(err);
  }
}

const connectPart2 = async (req, res) => {
  try {
    const { data: connect } = await axios({
      method: 'POST',
      url: 'https://api.meethue.com/bridge/',
      headers: {
        'Authorization': `Bearer ${req.token}`,
        'Content-Type': 'application/json'
      },
      data: { 'devicetype': 'dmcompanion' }
    });
    res.send(connect[0].success.username);
    console.log(connect);
  } catch (err) {
    console.log(err);
  }
}
// Once all that is done requests can be made through https://api.meethue.com/bridge/<whitelist_identifier>

// Follow this guide to complete the final step: https://developers.meethue.com/develop/hue-api/remote-api-quick-start-guide/

const detect = (req, res) => {
  hue.nupnpSearch(function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0].ipaddress);
    } else {
      res.send('')
    };
  });
};

const allLights = async (req, res) => {
  let user = req.body.user;
  let token = req.body.token;
  try {
    const { data: lights } = await axios({
      method: 'GET',
      url: 'https://api.meethue.com/bridge/' + user + '/lights',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const result = [];
    for (let i in lights) {
      result.push([i, lights[i]]);
    }
    res.json(result);
    console.log(result)
    console.log(lights)
  } catch (err) {
    console.log(err);
  }
}

const controlLights = (req, res) => {
  let light = req.body.light;
  let user = req.body.user;
  let token = req.body.token;
  const lightFunction = async (state, bri, alert, transitionTime) => {
    try {
    const { data: lights } = await axios({
      method: 'PUT',
      url: 'https://api.meethue.com/bridge/' + user + '/lights/' + light + '/state',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        'on': state,
        'bri': bri,
        'alert': alert,
        'transitiontime': transitionTime
      }
    });
      console.log(lights);
    } catch (err) {
      console.log(err);
    }
  }
  switch (req.body.hueState) {
    case 'on':
      lightFunction(true, 200);
      break;
    case 'off':
      lightFunction(false, 0);
      break;
    case 'fadeOut':
      lightFunction(true, 0, 'none', 50);
      break;
    case 'fadeIn':
      lightFunction(true, 200, 'none', 50);
      break;
    case 'lightning':
      break;
    case 'critical':
      lightFunction(true, 200, 'lselect')
    default:
      lightFunction(true, 200);
  }

}

exports.url = sendUrl;
exports.bridge = [connectPart1, connectPart2];
exports.connect = [generateNonce, generateAuthKeys];
exports.allLights = allLights;
exports.controlLights = controlLights;
