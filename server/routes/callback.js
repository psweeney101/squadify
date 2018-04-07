var Spotify = require("../spotify");
var db = require("../mongo");

module.exports = {

    /* CALLBACK FROM SPOTIFY AUTHORIZATION
     * @param Spotify code
     * STEPS:
     *  1) Get the access_token and refresh_token from Spotify using code
     *  2) Use tokens to get user's profile
     *  3) Create the user using tokens and id, or get the user from DB
     *  4) Create a cookie of user_id, access_token, refresh_token, and server_token
     *  5) Get all of the queues the user is in from DB
     *  6) Determine which queue the user should be sent to
     *  7) Redirect the user to the queue or the queues
     * @return cookie, redirect to queue or queues
     */
    callback: function (req, res) {
        console.log("LOGGING IN!!");
        if (req.query.code) {
            Spotify.Tokens.fetchTokens(req.query.code, (tokens) => {
                if (tokens.error || tokens.body == null) {
                    res.json(tokens);
                } else {
                    Spotify.Profiles.getMyProfile(tokens.body.access_token, tokens.body.refresh_token, (profile) => {
                        if (profile.error || profile.body == null) {
                            res.json(profile);
                        } else {
                            db.createUser(profile.body.id, profile.body.display_name, profile.body.images, tokens.body.access_token, tokens.body.refresh_token, (user) => {
                                req.universalCookies.remove("io");
                                req.universalCookies.set("Squadify", {
                                    user_id: profile.body.id,
                                    access_token: tokens.body.access_token,
                                    refresh_token: tokens.body.refresh_token,
                                    server_token: user.server_token
                                }, {path: "/", domain: "squadify.herokuapp.com"});
                                console.dir(req.universalCookies.getAll());
                                db.getQueuesForUser(user, (queues) => {
                                    if (queues[0] == null) {
                                        res.redirect(process.env.CLIENT_URL + "/");
                                    } else {
                                        res.redirect(process.env.CLIENT_URL + "/queue/" + queues[0].id);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        } else {
            res.json({ error: true, why: "No code supplied." })
        }
    }
}