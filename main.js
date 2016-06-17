var
  sensorLib = require('node-dht-sensor'),
  request   = require('request')
  sparkPrivKey = process.env.PIDHT_SPARKFUN_PRIVATE_KEY,
  sparkPubKey  = process.env.PIDHT_SPARKFUN_PUBLIC_KEY,
  interval     = process.env.PIDHT_INTERVAL,
  sensorCode   = process.env.PIDHT_SENSOR_CODE
  ;

var sensor = {
  initialize: function () {
    return sensorLib.initialize(parseInt(sensorCode), 4);
  },
  read: function () {
    var
      readout = sensorLib.read(),
      url,
      tempC,
      tempF,
      humidity
      ;

    tempC = readout.temperature.toFixed(2);
    humidity = readout.humidity.toFixed(2);
    tempF = tempC * 9.0 / 5.0 + 32.0;

    console.log(tempF + 'F, ' + tempC + 'C, ' + humidity + '% hum');

    url = 'https://data.sparkfun.com/input/' +
      sparkPubKey +
      '?private_key=' +
      sparkPrivKey +
      '&humidity=' +
      humidity +
      '&temp=' +
      tempC
      ;

    request(url, function(err, res, body) {
      if (err != undefined) {
        console.log(url, err, res, body);
      }
    });

    setTimeout(function () {
      sensor.read();
    }, interval);
  }
};

if (sensor.initialize()) {
  sensor.read();
} else {
  console.warn('Failed to initialize sensor');
}

