var userId = "spardeshi";
var urlString = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
var accessToken = "BQADjP6FZY3rpenUjwF7i7zjANng-hoDGtIeAzH_xJZZUlDO-Tajap_z0XlAbkz0kD5FJZwiPirTP01Y_6HFipRIPYmKQnQ1DQYzlJ923BMqIEDFLxQoxLiXiPN6JVi3D9-drDo568pdfYNDPgTpgA8zl4mQf89ATrUlngD07ukVVfhZHC9r8FiGXrK1GYZ2YOxefvLkkEC1";


var jsonData = {
  "name": "SpotiLyfe",
  "public": false
};



// Request Auth
$.ajax(
  {
    method: "GET",
    url: "https://accounts.spotify.com/authorize",
    data: {
      "response_type": 'code',
      "redirect_uri":  "https://spotilyfe.github.io/callback.html",
      "client_id":     SPOTIFY_CLIENT_ID,
    },
    success: function(result) {
        console.log("Auth: " +result);
        getAccessToken();
    },
  }
);


// Get Access Token
function getAccessToken() {
    $.ajax(
      {
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: {
          "grant_type":    "authorization_code",
          "code":          "code",
          "redirect_uri":  "https://spotilyfe.github.io/callback.html",
          "client_secret": SPOTIFY_CLIENT_SECRET,
          "client_id":     SPOTIFY_CLIENT_ID,
        },
        success: function(result) {
            console.log("AccessToken: " + result);
            makePlaylist();
        },
      }
    );
}

function makePlaylist() {
    // Make playlist
    $.ajax({
      type: 'POST',
      url: urlString,
      data: jsonData,
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      contentType: 'application/json',
      success: function(result) {
        console.log('Woo! :)');
      },
      error: function() {
        console.log('Error! :(');
      }
    });
}
