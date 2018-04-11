var request = require("request");
var baseURL = "https://api.spotify.com";
var Response = require("./response");

var Player = {
    getDevices: function(access_token, refresh_token, cb) {
        var options = {
            url: baseURL + '/v1/me/player/devices',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        request.get(options, function (error, response, body) {
            Response(error, response, body, [200], refresh_token, cb, (newToken) => {
                if(newToken != null) {
                    Player.getDevices(newToken, refresh_token, cb);
                }
            });
        });
    },
    play: function(access_token, refresh_token, uri, device_id, cb) {
        var options = {
            url: baseURL + '/v1/me/player/play',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        };
        if(uri != null) {
            options.body = JSON.stringify({uris: [uri]});
        }
        if(device_id != null) {
            options.url += "?device_id=" + device_id;
        }
        request.put(options, function (error, response, body) {
            Response(error, response, body, [204], refresh_token, cb, (newToken) => {
                if(newToken != null) {
                    Player.play(newToken, refresh_token, uri, device_id, cb);
                }
            });
        });
    },
    pause: function(access_token, refresh_token, cb) {
        var options = {
            url: baseURL + '/v1/me/player/pause',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        };
        request.put(options, function (error, response, body) {
            Response(error, response, body, [204], refresh_token, cb, (newToken) => {
                if(newToken != null) {
                    Player.pause(newToken, refresh_token, cb);
                }
            });
        });
    },
    getCurrentPlayer: function(access_token, refresh_token, cb) {
        var options = {
            url: baseURL + '/v1/me/player',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        request.get(options, function (error, response, body) {
            if(response == null) {
                console.dir(body);
                console.dir(error);
            }
            Response(error, response, body, [200, 202, 204], refresh_token, cb, (newToken) => {
                if(newToken != null) {
                    Player.getCurrentPlayer(newToken, refresh_token, cb);
                }
            });
        });
    }
}

module.exports = Player;