//var tessel = require('tessel');
var rgbLib = require('../');
var rgb = rgbLib.use('/dev/i2c-1', 'P8_12', 'P8_13');

rgb.on('ready', function() {
  
  setInterval(function() {
    rgb.calculateColorTemperature(function(err, temp) {
      if (err) throw err;

      console.log('TEMP:', temp);
    })
  }, 1000);
})