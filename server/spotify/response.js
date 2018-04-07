var request = require("request");
var baseURL = "https://api.spotify.com";
var db = require("../mongo");

function handleResponse(error, response, body, statuses, refresh_token, cb, newTokenCb) {
    if(response != null && statuses.includes(response.statusCode)) {
        return cb({error: false, body: body});
    } else {
        if(body != null && body.error != null && body.error.message == "The access token expired") {
            console.log("NEW ACCESS TOKEN!!!");
            var Tokens = require("./tokens");
            Tokens.refreshTokens(refresh_token, (newToken) => {
                console.log(newToken.body.access_token);
                return newTokenCb(newToken.body.access_token);
            });
        } else {
            return cb({error: true, why: error});
        }
    }
}

/*function refreshToken(refresh_token, cb) {
    var options = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            "Authorization": "Basic " + new Buffer(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"),
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        },
        json: true
    };
    request.post(options, (error, response, body) => {
        handleResponse(error, response, body, [200], null, (tokens) => {
            if(tokens.error) {
                return cb(tokens);
            } else {
                var Profiles = require("./profiles");
                Profiles.getMyProfile(tokens.body.access_token, refresh_token, (profile) => {
                    if(profile.error) {
                        return cb(profile);
                    } else {
                        db.updateTokens(profile.body.id, tokens.body.access_token, refresh_token, (user) => {
                            if(user == null) {
                                return cb({error: true, why: "User could not be updated"});
                            } else {
                                return cb(tokens);
                            }
                        });
                    }
                });
            }
        });
    });
}*/

module.exports = handleResponse;