var sensorLib = require('node-dht-sensor');
var request   = require('request');

var sensor = {
    initialize: function () {
        return sensorLib.initialize(22, 4);
    },
    read: function () {
        var readout = sensorLib.read(),
            url,
            temp,
            humidity;

        temp = readout.temperature.toFixed(2);
        humidity = readout.humidity.toFixed(2);

        console.log('Temperature: ' + temp + 'C, ' + 'humidity: ' + humidity + '%');

        url = 'https://data.sparkfun.com/input/xRxozvJKz8tpV1z49bvw?private_key=ZaNk7zYD71s6kY9WaRrm&humidity=' +
          humidity +
          '&temp=' +
          temp;

        request(url, function(err, res, body) {
          console.log(err, res, body);
        });

        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}

