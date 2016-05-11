var
  sensorLib = require('node-dht-sensor'),
  request   = require('request')
  sparkPrivKey = process.env.PIDHT_SPARKFUN_PRIVATE_KEY,
  sparkPubKey  = process.env.PIDHT_SPARKFUN_PUBLIC_KEY,
  interval     = process.env.PIDHT_INTERVAL
  sensorCode   = process.env.PIDHT_SENSOR_CODE // 11 or 22
  ;

var sensor = {
  initialize: function () {
    return sensorLib.initialize(sensorCode, 4);
  },
  read: function () {
    var
      readout = sensorLib.read(),
      url,
      temp,
      humidity
      ;

    temp = readout.temperature.toFixed(2);
    humidity = readout.humidity.toFixed(2);

    console.log('Temperature: ' + temp + 'C, ' + 'humidity: ' + humidity + '%');

    url = 'https://data.sparkfun.com/input/' +
      sparkPubKey +
      '?private_key=' +
      sparkPrivKey +
      '&humidity=' +
      humidity +
      '&temp=' +
      temp
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

