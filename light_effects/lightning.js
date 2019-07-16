const hue = require('node-hue-api');

module.exports = lightning = (api, light) => {
  const lightState = hue.lightState;
  let state;
  setTimeout(function () {
    state = lightState.create().off();
    api.setLightState(light, state);
  }, 0);
  setTimeout(function () {
    state = lightState.create().on().brightness(0);
    api.setLightState(light, state);
  }, 20);
  setTimeout(function () {
    state = lightState.create().on().brightness(100);
    api.setLightState(light, state);
  }, 100);
  setTimeout(function () {
    state = lightState.create().on().brightness(0);
    api.setLightState(light, state);
  }, 300);
  setTimeout(function () {
    state = lightState.create().on().brightness(100);
    api.setLightState(light, state);
  }, 700);
  setTimeout(function () {
    state = lightState.create().on().brightness(0);
    api.setLightState(light, state);
  }, 945);
  setTimeout(function () {
    state = lightState.create().on().brightness(100);
    api.setLightState(light, state);
  }, 1100);
  setTimeout(function () {
    state = lightState.create().on().brightness(0);
    api.setLightState(light, state);
  }, 1300);
  setTimeout(function () {
    state = lightState.create().on().brightness(100);
    api.setLightState(light, state);
  }, 1600);
  setTimeout(function () {
    state = lightState.create().on().brightness(0);
    api.setLightState(light, state);
  }, 1955);
  setTimeout(function () {
    state = lightState.create().on().brightness(100);
    api.setLightState(light, state);
  }, 2150);
  setTimeout(function () {
    state = lightState.create().on().brightness(0);
    api.setLightState(light, state);
  }, 2300);
  setTimeout(function () {
    state = lightState.create().on().brightness(100);
    api.setLightState(light, state);
  }, 2500);
  setTimeout(function () {
    state = lightState.create().off();
    api.setLightState(light, state);
  }, 3000);
  setTimeout(function () {
    state = lightState.create().on().brightness(50);
    api.setLightState(light, state);
  }, 4000);
};
