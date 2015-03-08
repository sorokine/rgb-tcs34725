rgb-tcs34725
============

A JavaScript driver for the TCS34725 RGB sensor.  Modified from the original https://github.com/johnnyman727/rgb-tcs34725 for BeagleBoneBlack (BBB).  Use it to find the red, green, blue, or clear levels of anything you point it at. The API gives you access to the raw RGBC data, color temperatures, and lux intensity. You can buy the breakout board from [Adafruit](http://www.adafruit.com/product/1334).

![Breakout Image](http://www.adafruit.com/images/970x728/1334-00.jpg)

The chip also has support for threshold interrupts on the clear channel and those APIs have been implemented here but not fully tested.

## Installation
```npm install BBB-TCS34725```

## Hardware Connections to Tessel

You can connect the module to the following the ports on BBB:

VIN  ->  Unconnected 

GND  ->  GND 

3V3  ->  3V3 

SCL  ->  I2C2_SCL

SDA  ->  I2C2_SDA

INT  ->  GPIO_26 // configurable

LED  ->  GPIO_61 // configurable





## Example Usage
```.js
//var tessel = require('tessel');
var rgbLib = require('../');
//var rgb = rgbLib.use(tessel.port.A);
var rgb = rgbLib.use({ 
  "bus"     : "/dev/i2c-1", 
  "led_pin" : "P8_14", // will be ignored if not set
  "irq_pin" : "P8_26"  // will be ignored if not set
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
```

## API

### Commands

```library.use({ "bus" : "/dev/i2c-1", ...}, callback)``` initializes the module on the port of a microcontroller. It returns the `rgb` object and the callback has the form of `callback(err, rgb)`.

```rgb.getRawData(err, colors)``` returns rgbc data. `colors` has `red`, `green`, `blue`, and `clear` properties. Each of the colors is a 16 bit number.

```rgb.calculateColorTemperature(callback(err, temp))``` returns the color temperature as a 16 bit number representing Kelvins. The temperature it returns is in units of Kelvin.

```rgb.calculateLux(callback(err, lux))``` returns the light intensity as a 16 bit number that represents the light intensity.

```rgb.enable(callback(err))``` enables the module to read colors. It is called automatically when the `use` function is called.

```rgb.disable()``` can be used to put the module to sleep and reduce power consumption. Call ```rgb.enable()``` to wake it back up.

```rgb.setIntegrationTime(time, callback)``` sets the amount of time integrating values from an ADC (which determines color). Longer times produce more accurate numbers at low light levels. Available times can be found with `rgb.integrationTimes`.

```rgb.setGain(gain, callback)``` sets the gain of the ADC. Available gains can be found with `rgb.gains`.
