var Spotify = require("../spotify");
var db = require("../mongo");
var User = require("../user");

module.exports = {

    /* GET DEVICES OF HOST
     * @params user_id, server_token, queue_id
     * STEPS:
     *  1) Verify the user's server_token
     *  2) Verify the user is the queue's host
     *  3) Send the user's devices
     * @return devices
     */
    getDevices: function(req, res) {
        if (req.query.user_id && req.query.server_token) {
            db.checkUser(req.params.queue_id, req.query.user_id, req.query.server_token, (good, queue, user) => {
                if(good) {
                    if(queue.host.id == user.id) {
                        Spotify.Player.getDevices(queue.host.access_token, queue.host.refresh_token, (devices) => {
                            res.json({spotify: devices, access_token: user.access_token});
                        });
                    } else {
                        res.json({error: true, why: "User is not the host"});
                    }
                } else {
                    res.json({ error: true, why: "User is not in queue"});
                }
            });
        } else {
            res.json({ error: true, why: "Missing arguments" });
        }
    }
}