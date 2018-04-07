var Spotify = require("../spotify");
var db = require("../mongo");
var User = require("../user");

module.exports = {

    /* REFRESH THE USER'S ACCES_TOKEN
     * @param refresh_token
     * STEPS:
     *  1) Pass the refresh_token to Spotify
     *  2) Send the new access_token back to user
     * @return access_token
     */
    refresh: function (req, res) {
        if (req.body.refresh_token != null) {
            Spotify.Tokens.refreshTokens(req.body.refresh_token, (tokens) => {
                if (tokens.error) {
                    res.json(tokens);
                } else {
                    console.log("NEW TOKEN!");
                    console.dir(tokens);
                    res.json({ access_token: tokens.body.access_token, refresh_token: req.body.refresh_token });
                }
            })
        } else {
            res.json({ error: true, why: "Missing arguments" });
        }
    },

    /* VERIFY THE USER'S TOKENS ON LOGIN
     * @param user_id, access_token, refresh_token, server_token
     * STEPS:
     *  1) Find user in DB from user_id
     *  2) Ensure access_token, refresh_token, and server_token are equivalent to DB's
     *  3) Tell the client if the tokens are good or bad
     * @return boolean
     */
    check: function (req, res) {
        if (req.query.user_id && req.query.access_token && req.query.refresh_token && req.query.server_token) {
            User.findOne({ id: req.query.user_id }, function (error, user) {
                if (error) throw error;
                else if (!user) res.json({ good: false, why: "User not found" });
                else {
                    if (req.query.access_token === user.access_token) {
                        if (req.query.refresh_token === user.refresh_token) {
                            if (req.query.server_token === user.server_token) {
                                res.json({ good: true });
                            } else {
                                res.json({ good: false, why: "Bad server token" });
                            }
                        } else {
                            res.json({ good: false, why: "Bad refresh token" });
                        }
                    } else {
                        res.json({ good: false, why: "Bad access token" });
                    }
                }
            })
        } else {
            res.json({ error: true, good: false, why: "Missing arguments" });
        }
    }
}