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
var link1 = "https://open.spotify.com/track/7GWo0tyrAT1e3TwpxWqFE1";
var link2 = "https://open.spotify.com/track/54EWDYWhs4w6SODnxabuoh";
var link3 = "https://open.spotify.com/track/7zOoHxDt1duHL8czY7o7ab";

// "urban" songs
var link4 = "https://open.spotify.com/track/2y0zglZs6AlNBg4XEm2leW";
var link5 = "https://open.spotify.com/track/5ItzU5pBrFmRUudfr5RkJP";
var link6 = "https://open.spotify.com/track/5uImkHXfTLkNYwemtGH7kB";

var songs = [link1, link2, link3, link4, link5, link6];

console.log(imageMetaData);

var oauth = "BQADjP6FZY3rpenUjwF7i7zjANng-hoDGtIeAzH_xJZZUlDO-Tajap_z0XlAbkz0kD5FJZwiPirTP01Y_6HFipRIPYmKQnQ1DQYzlJ923BMqIEDFLxQoxLiXiPN6JVi3D9-drDo568pdfYNDPgTpgA8zl4mQf89ATrUlngD07ukVVfhZHC9r8FiGXrK1GYZ2YOxefvLkkEC1";

function addVideoElement(url) {
  document.getElementById("widget").innerHTML =
  '<iframe src="https://open.spotify.com/embed?uri=spotify:user:erebore:playlist:788MOXyTfcUb1tdw4oC7KJ" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';
}

function randomNum() {
  return Math.floor(Math.random() * 3);
}

// Generate random song from classification:
function getSong(response) {
  var responseData = JSON.parse(response);
  console.log(responseData["tracks"]["items"]["external_urls"][randomNum()]);
}

function spotify(genre){
  if(genre == "country") {
    addVideoElement(songs[randomNum()])
  } else {
    addVideoElement(songs[randomNum() + 3]);
  }
}
