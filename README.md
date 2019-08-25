# rolling-ball #

Rolling ball demo for DeviceOrientation and DeviceMotion APIs

## Development ##

### Prerequisites ###

Install [Node.JS](https://nodejs.org) if you don't have it already.

### HTTPS ###

The DeviceOrientation and DeviceMotion APIs require HTTPS to work in safari mobile.
So, it'll be necessary to setup an HTTPS certificate using the following:

- `openssl req -nodes -new -x509 -keyout secret/server.key -out secret/server.cert`
  - Enter at least a country (you can leave the rest blank or fill it in if you wish)

### Install ###

- `npm install`

### Run ###

- Build & Start Dev Server: `npm run-script dev`
- Open `https://localhost:3333` (*make sure to use https*)
