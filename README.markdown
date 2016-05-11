# Pi-DHT

This code deploys an interface to DHT11/DHT22/RHT03 temperature/humidity
sensors via [Resin.io](https://resin.io).

## Usage

1. Wire up your pi like this:

  !(https://cdn-learn.adafruit.com/assets/assets/000/001/860/medium800/raspberry_pi_dht11wiring.gif?1447864313)

  Good references are:

  * [http://pinout.xyz/]
  * [https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/wiring]

1. Sign up with Resin.io
1. Create a Raspberry Pi application
1. Download the image
1. Flash the image to an SD card
1. Boot up the Pi
1. Clone this repo
1. Copy the command to add a git remote and add the remote to your clone/fork
  of this repo
1. Run `git push resin master`
1. While your image is building and deploying create a free data stream at
  [data.sparkfun.com](https://data.sparkfun.com/).
1. set the following environment
  variables in the Resin application:

  * `PIDHT_SPARKFUN_PRIVATE_KEY=<data.sparkfun.com private key>`
  * `PIDHT_SPARKFUN_PUBLIC_KEY=<data.sparkfun.com public key>`
  * `PIDHT_INTERVAL=<integer ms interval between readings>`

