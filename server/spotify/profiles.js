var request = require("request");
var baseURL = "https://api.spotify.com";
var Response = require("./response");

var Profiles = {
    getMyProfile(access_token, refresh_token, cb) {
        var options = {
            url: baseURL + '/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        request.get(options, function (error, response, body) {
            Response(error, response, body, [200], refresh_token, cb, (newToken) => {
                if(newToken != null) {
                    Profiles.getMyProfile(newToken, refresh_token, cb);
                }
            });
        });
    },
}

module.exports = Profiles;