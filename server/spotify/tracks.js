var request = require("request");
var baseURL = "https://api.spotify.com";
var Response = require("./response");

var Tracks = {
    getTrack(access_token, refresh_token, id, cb) {
        var options = {
            url: baseURL + '/v1/tracks/' + id,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        request.get(options, function (error, response, body) {
            Response(error, response, body, [200], refresh_token, cb, (newToken) => {
                if(newToken != null) {
                    Profiles.getTrack(newToken, refresh_token, id, cb);
                }
            });
        });
    },
}

module.exports = Tracks;