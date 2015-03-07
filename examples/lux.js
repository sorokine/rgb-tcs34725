//var tessel = require('tessel');
var rgbLib = require('../');
var rgb = rgbLib.use('/dev/i2c-1', 'P8_12', 'P8_13');

rgb.on('ready', function() {
  
  setInterval(function() {
    rgb.calculateLux(function(err, lux) {
      if (err) throw err;

      console.log('LUX:', lux);
    })
  }, 1000);
})