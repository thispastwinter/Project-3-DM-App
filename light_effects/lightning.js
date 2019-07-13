// const hue = require('node-hue-api');
// const HueApi = require('node-hue-api').HueApi;

// lightning = (light) => {
//   let api = new HueApi();
//   const lightState = hue.lightState;
//   let state = lightState.create().on();
//   api.setLightState(light, state, function (err, lights) {
//     if (err) throw err;
//     res.json(lights)
//     setTimeout(function () {
//       console.log('Hi!')
//       state = lightState.create().off();
//       api.setLightState(light, state, function (err, lights) {
//         if (err) throw err;
//         res.json(lights)
       
//       }, 1000)
      
//     });
//     setTimeout(function () {
//       state = lightState.create().on();
//       api.setLightState(light, state, function (err, lights) {
//         if (err) throw err;
//         res.json(lights)
//       }, 2000)
//       console.log('Hi!')
//     });
//     setTimeout(function () {
//       state = lightState.create().off();
//       api.setLightState(light, state, function (err, lights) {
//         if (err) throw err;
//         res.json(lights)
//       }, 5000)
//       console.log('Hi!')
//     });
//     setTimeout(function () {
//       state = lightState.create().on();
//       api.setLightState(light, state, function (err, lights) {
//         if (err) throw err;
//         res.json(lights)
//       }, 6000)
//       console.log('Hi!')
//     });
//     setTimeout(function () {
//       state = lightState.create().off();
//       api.setLightState(light, state, function (err, lights) {
//         if (err) throw err;
//         res.json(lights)
//       }, 9000)
//       console.log('Hi!')
//     });
//     setTimeout(function () {
//       state = lightState.create().on();
//       api.setLightState(light, state, function (err, lights) {
//         if (err) throw err;
//         res.json(lights)
//       }, 11000)
//       console.log('Hi!')
//     });
//   });
// }

// pass in light functions with varying levels of brightness 

lightning = () => {
  setTimeout(function () {
    console.log('Hi!')
  }, 100)

  // could potentially use the built in transition function for timing to make this even more realistic transitiontime(int)	
  setTimeout(function () {
    console.log('Hi!')
  }, 500)
  setTimeout(function () {
    console.log('Hi!')
  }, 1000)
  setTimeout(function () {
    console.log('Hi!')
  }, 1200)
  setTimeout(function () {
    console.log('Hi!')
  }, 2000)
  setTimeout(function () {
    console.log('Hi!')
  }, 2100)
  setTimeout(function () {
    console.log('Hi!')
  }, 2700)
  setTimeout(function () {
    console.log('Hi!')
  }, 2800)
  setTimeout(function () {
    console.log('Hi!')
  }, 2870)
  setTimeout(function () {
    console.log('Hi!')
  }, 3000)
  setTimeout(function () {
    console.log('Hi!')
  }, 3100)
  setTimeout(function () {
    console.log('Hi!')
  }, 3600)
}

lightning();