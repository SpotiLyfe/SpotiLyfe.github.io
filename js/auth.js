const SPOTIFY_CLIENT_ID = '964b4736722e41de899fb3faac5c904c';
const SPOTIFY_CLIENT_SECRET = 'f68e2046d7454d128c48d840acdff617';
const AZURE_URL = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0';
const AZURE_KEY_1 = '50be2cc1ee1a4a7ba86025bebf108e9f';
const AZURE_KEY_2 = '08a1d011ff1946d98f83c088052ef50d';
const WEATHER_API_KEY = '66843ecf4919fe2bea8f3b4029511f81';



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
    
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&appid=" + WEATHER_API_KEY;
          
    $.getJSON(url, function(weather) {
        //console.log(weather);
    });
};

function error(err) {
    alertify.error(`ERROR(${err.code}): ${err.message}`);
};


function updateLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

updateLocation();