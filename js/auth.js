const SPOTIFY_CLIENT_ID = '964b4736722e41de899fb3faac5c904c';
const SPOTIFY_CLIENT_SECRET = 'f68e2046d7454d128c48d840acdff617';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    alertify.warning(`Latitude : ${crd.latitude}`);
    alertify.warning(`Longitude: ${crd.longitude}`);
    alertify.warning(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
    alertify.error(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);