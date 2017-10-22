// Get image

// Get the brighness and greenness
function getLightness(imageSrc, callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var r, g, b, avg;

        var green = 0;
        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r+g+b)/3);
            green += g;
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        var greenVal = Math.floor(green  / (this.width*this.height));
        callback(brightness, greenVal);
    }
}

// Genre classification

var threshold = 128;
var url = "./img/test.jpg";
getLightness(url, function(b, g) {
    console.log(b + "-" + g);

    if(g > threshold){
        spotify("country");
    } else {
        spotify("urban");
    }
});

// Sentiment analysis

// Genre classification

// country songs
var link1 = "https://open.spotify.com/track/7GWo0tyrAT1e3TwpxWqFE1"
var link2 = "https://open.spotify.com/track/54EWDYWhs4w6SODnxabuoh"
var link3 = "https://open.spotify.com/track/7zOoHxDt1duHL8czY7o7ab"

// "urban" songs
var link4 = "https://open.spotify.com/track/2y0zglZs6AlNBg4XEm2leW"
var link5 = "https://open.spotify.com/track/5ItzU5pBrFmRUudfr5RkJP"
var link6 = "https://open.spotify.com/track/5uImkHXfTLkNYwemtGH7kB"

var songs = [link1, link2, link3, link4, link5, link6]

var express = require('express'); // Express web server framework
var app = express();
app.use(express.static(__dirname + '/public'));
console.log('Listening on 8888');
app.listen(8888);

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : SPOTIFY_CLIENT_ID,
  clientSecret : SPOTIFY_CLIENT_SECRET,
  redirectUri : 'http://spotilyfe.github.io'
});

spotifyApi.setAccessToken(oauthToken)
module.exports = function (n) { return n * 111 }

spotifyApi.searchTracks('Country')
  .then(function(data) {
    console.log('Search by "Country"', data.body);
  }, function(err) {
    console.error(err);
  });

// random num used for random song from json returned from get
function randomNum() {
  return Math.floor(Math.random() * 3)
}

// Generate random song from classification:
function getSong(response) {
  var responseData = JSON.parse(response)
  console.log(responseData["tracks"]["items"]["external_urls"][randomNum()])
}

function spotify(genre){
  if(genre == "country") {
    return songs[randomNum()]
  } else {
    return songs[randomNum() + 3]
  }
  // fetch(CORS_URL + GET_URL + "%22" + genre + "%22&type=track&limit=10")
  //   .then(getSong)
  //   .catch(function(errorMessage) { alert("error: " + errorMessage); });
  //   console.log("Country");
}
