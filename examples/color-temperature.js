//var tessel = require('tessel');
var rgbLib = require('../');
var rgb = rgbLib.use({ 
  "bus"     : "/dev/i2c-1", 
  "led_pin" : "P8_14", 
  "irq_pin" : "P8_26"
});

rgb.on('ready', function() {
  
  setInterval(function() {
    rgb.calculateColorTemperature(function(err, temp) {
      if (err) throw err;

      console.log('TEMP:', temp);
    })
  }, 1000);
})