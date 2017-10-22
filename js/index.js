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

// country songs
var link1 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A7GWo0tyrAT1e3TwpxWqFE1";
var link2 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A54EWDYWhs4w6SODnxabuoh";
var link3 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A7zOoHxDt1duHL8czY7o7ab";
var link4 = 'https://open.spotify.com/embed?uri=spotify%3Atrack%3A5jROdl6MhcmP3O7h2sVgtw'
var link5 = 'https://open.spotify.com/embed?uri=spotify%3Atrack%3A0ipcmHor30Y8p6hCd8QUVq'
var link6 = 'https://open.spotify.com/embed?uri=spotify%3Atrack%3A5j4hSQH0KaAc8f6cimnXIT'

// "urban" songs
var link7 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A2y0zglZs6AlNBg4XEm2leW";
var link8 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A5ItzU5pBrFmRUudfr5RkJP";
var link9 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A5uImkHXfTLkNYwemtGH7kB";
var link10 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A76IkF7pA7RscjDTvOFT4vb"
var link11 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A3gWu8y0TKCIdy2mpTqVnTl";
var link12 = "https://open.spotify.com/embed?uri=spotify%3Atrack%3A2QAYzr2tstl81RiI7a5nfI";

var songs = [link1, link2, link3, link4, link5, link6, link7, link8, link9, link10, link11, link12];

function addVideoElement(url) {
  document.getElementById("widget").innerHTML =
  '<iframe src="' + url + '" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>';
}

function randomNum() {
  return Math.floor(Math.random() * 6);
}

function spotify(genre){
  if(genre == "country") {
    return(songs[randomNum()]);
  } else {
    return(songs[randomNum() + 6]);
  }
}
