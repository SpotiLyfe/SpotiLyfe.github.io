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

function getUsername(callback) {
  console.log('getUsername');
	var url = 'https://api.spotify.com/v1/me';
	$.ajax(url, {
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + g_access_token
		},
		success: function(r) {
			console.log('got username response', r);
			callback(r.id);
		},
		error: function(r) {
			callback(null);
		}
	});
}

function createPlaylist(username, name, callback) {
	console.log('createPlaylist', username, name);
	var url = 'https://api.spotify.com/v1/users/' + username +
		'/playlists';
	$.ajax(url, {
		method: 'POST',
		data: JSON.stringify({
			'name': name,
			'public': false
		}),
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + g_access_token,
			'Content-Type': 'application/json'
		},
		success: function(r) {
			console.log('create playlist response', r);
			callback(r.id);
		},
		error: function(r) {
			callback(null);
		}
	});
}

var CORS_URL = "https://cors.io/?";
var GET_URL = "https://api.spotify.com/v1/";
fetch(CORS_URL + "https://accounts.spotify.com/authorize/?client_id=" + "964b4736722e41de899fb3faac5c904c" + "&response_type=code")
  .then(function(response) {console.log(response);} )
  .catch(function(errorMessage) { alert("error: " + errorMessage); });

function addTracksToPlaylist(username, playlist, tracks, callback) {
	console.log('addTracksToPlaylist', username, playlist, tracks);
	var url = 'https://api.spotify.com/v1/users/' + username +
		'/playlists/' + playlist +
		'/tracks'; // ?uris='+encodeURIComponent(tracks.join(','));
	$.ajax(url, {
		method: 'POST',
		data: JSON.stringify(tracks),
		dataType: 'text',
		headers: {
			'Authorization': 'Bearer ' + g_access_token,
			'Content-Type': 'application/json'
		},
		success: function(r) {
			console.log('add track response', r);
			callback(r.id);
		},
		error: function(r) {
			callback(null);
		}
	});
}
function doit() {
	// parse hash
	var hash = location.hash.replace(/#/g, '');
	var all = hash.split('&');
	var args = {};
	console.log('all', all);
	all.forEach(function(keyvalue) {
		var idx = keyvalue.indexOf('=');
		var key = keyvalue.substring(0, idx);
		var val = keyvalue.substring(idx + 1);
		args[key] = val;
	});
	g_name = localStorage.getItem('createplaylist-name');
	g_tracks = JSON.parse(localStorage.getItem('createplaylist-tracks'));
	console.log('got args', args);
	if (typeof(args['access_token']) != 'undefined') {
		// got access token
		console.log('got access token', args['access_token']);
		g_access_token = args['access_token'];
	}
	getUsername(function(username) {
		console.log('got username', username);
		createPlaylist(username, g_name, function(playlist) {
			console.log('created playlist', playlist);
			addTracksToPlaylist(username, playlist, g_tracks, function() {
				console.log('tracks added.');
				$('#playlistlink').attr('href', 'spotify:user:'+username+':playlist:'+playlist);
				$('#creating').hide();
				$('#done').show();
			});
		});
	});
}

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
