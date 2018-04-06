var request = require("request");
var baseURL = "https://api.spotify.com";
var Profiles = require("./profiles");
var Response = require("./response");
var db = require("../mongo");

var Tokens = {
    fetchTokens(code, cb) {
        var options = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers: {
                "Authorization": "Basic " + (new Buffer(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"))
            },
            json: true
        };
        request.post(options, (error, response, body) => {
            Response(error, response, body, [200], null, cb);
        });
    },
    refreshTokens(refresh_token, cb) {
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
            Response(error, response, body, [200], null, (tokens) => {
                if(tokens.error) {
                    return cb(tokens);
                } else {
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
    }
}

module.exports = Tokens;