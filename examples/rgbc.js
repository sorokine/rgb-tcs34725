//var tessel = require('tessel');
var rgbLib = require('../');
//var rgb = rgbLib.use(tessel.port.A);
var rgb = rgbLib.use({ 
  "bus"     : "/dev/i2c-1", 
  "led_pin" : "P8_14", 
  "irq_pin" : "P8_26",
  "module_id" : 0x44
});

var ledON = false;
rgb.on('ready', function() {
  
  setInterval(function() {
    rgb.getRawData(function(err, colors) {
      if (err) throw err;

      console.log('RED:', colors.red);
      console.log('GREEN:', colors.green);
      console.log('BLUE:', colors.blue);
      console.log('CLEAR:', colors.clear);
    });
    
    ledON = !ledON;
    rgb.setLED(ledON);
  }, 1000);
})