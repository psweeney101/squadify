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
            console.dir(body);
            return cb({error: true, why: error});
        }
    }
}

module.exports = handleResponse;