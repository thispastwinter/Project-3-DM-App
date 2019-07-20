require('dotenv').config();
const dotenv = require('dotenv');
const hue = require('node-hue-api');
const HueApi = require('node-hue-api').HueApi;
const axios = require('axios');
const md5 = require('md5');
require('../light_effects/lightning');


// Remote Pseudocode //

// >GET https://api.meethue.com/oauth2/auth?clientid=<clientid>&appid=<appid>&deviceid=<deviceid>&devicename=<devicename>&state=<state>&response_type=code

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)



const requestConnection = () => {
  axios.get('https://api.meethue.com/oauth2/auth?clientid=' + clientId + '&appid=dmcompanion&deviceid=dm&state=none&response_type=code')
  .then(res => {
    console.log(res.data);
  }).catch(err => {
    console.log(err);
  })
};

requestConnection();

// This get request is made, and redirects the user to the hue login page. It then asks them if they give permission for the app to use their acct.
// The user is then redirected and a code is received from as a reponse.
// This code will be given to the second request and used to trigger a 401 with a valid nonce key.
// Another request is made with the given header from Hue Developer Remote Page implementing the clientid, nonce key, and a calculated hashed response.

// I.E:

let generatedNonce = '0245fed472822f7d969a1617699f8041';

const createHash = (nonce) => {
  let hash1 = md5(clientId + ':' + 'oauth2_client@api.meethue.com' + ':' + clientSecret);
  // HASH2	MD5(“VERB” + “:” + “PATH”)
  let hash2 = md5('POST:/oauth2/token');
  // response	MD5(HASH1 + “:” + “NONCE” + “:” + HASH2)
  let response = md5(hash1 + ':' + nonce + ':' + hash2);
  
  return response
  }

const generateAuthKeys = () => {
  axios.post('https:api.meethue.com/oauth2/token?code=' + code + '&grant_type=authorization_code', {
    Authorization: username = clientId, 
      realm = 'oauth2_client@api.meethue.com', 
      nonce = generatedNonce, 
      uri = '/oauth2/token', 
      response = createHash(generatedNonce) 
    }
  );
};





// HASH1	MD5(“CLIENTID” + “:” + “REALM” + “:” + “CLIENTSECRET”) //clientId and secret will be stored in a .env



// The response will generate an auth token and a refresh token.

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

const connect = (req, res) => {
  let host = req.body.host;
  let newApi = new HueApi();
  newApi.createUser(host, function (err, user) {
    if (err) throw err;
    res.json(user);
  });
}

const allLights = (req, res) => {
  let host = req.body.host;
  let user = req.body.user;
  let api = new HueApi(host, user);
  api.lights(function (err, lights) {
    if (err) throw err;
    res.json(lights);
  });
}

const controlLights = (req, res) => {
  const lightState = hue.lightState;
  let host = req.body.host;
  let username = req.body.username;
  let light = req.body.light;
  let api = new HueApi(host, username);
  let state;
  switch (req.body.huestate) {
    case 'on':
      state = lightState.create().on();
      api.setLightState(light, state, function (err, lights) {
        if (err) throw err;
        res.json(lights)
      });
      break;
    case 'off':
      state = lightState.create().off();
      api.setLightState(light, state, function (err, lights) {
        if (err) throw err;
        res.json(lights)
      });
      break;
    case 'critical':
      state = lightState.create().longAlert();
      api.setLightState(light, state, function (err, lights) {
        if (err) throw err;
        res.json(lights)
      });
      break;
    case 'lightning':
      lightning(api, light);
      break;
    default:
      state = lightState.create().on();
      api.setLightState(light, state, function (err, lights) {
        if (err) throw err;
        res.json(lights)
      });
  };
}

exports.detect = detect;
exports.connect = connect;
exports.allLights = allLights;
exports.controlLights = controlLights;
