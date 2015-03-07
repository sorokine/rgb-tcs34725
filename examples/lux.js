//var tessel = require('tessel');
var rgbLib = require('../');
var rgb = rgbLib.use({ 
  "bus"     : "/dev/i2c-1", 
  "led_pin" : "P8_14", 
  "irq_pin" : "P8_26"
});

rgb.on('ready', function() {
  
  setInterval(function() {
    rgb.calculateLux(function(err, lux) {
      if (err) throw err;

      console.log('LUX:', lux);
    })
  }, 1000);
})