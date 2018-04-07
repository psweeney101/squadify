var request = require("request");
var baseURL = "https://api.spotify.com";
var Response = require("./response");

var Playlists = {
    getPlaylist: function(access_token, refresh_token, owner_id, playlist_id, cb) {
        var options = {
            url: baseURL + "/v1/users/" + owner_id + "/playlists/" + playlist_id,
            headers: {
                "Authorization": "Bearer " + access_token
            },
            json: true
        };
        request.get(options, function (error, response, body) {
            Response(error, response, body, [200], refresh_token, cb, (newToken) => {
                console.log(newToken);
                if(newToken != null) {
                    Player.getPlaylist(newToken, refresh_token, owner_id, playlist_id, cb);
                }
            });
        });
    }
}

module.exports = Playlists;