const SPOTIFY_CLIENT_ID = '964b4736722e41de899fb3faac5c904c';
const SPOTIFY_CLIENT_SECRET = 'f68e2046d7454d128c48d840acdff617';
const AZURE_URL = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0';
const AZURE_KEY_1 = '50be2cc1ee1a4a7ba86025bebf108e9f';
const AZURE_KEY_2 = '08a1d011ff1946d98f83c088052ef50d';

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