var Spotify = require("../spotify");
var db = require("../mongo");
var User = require("../user");

module.exports = {

    /* REFRESH THE USER'S ACCES_TOKEN
     * STEPS:
     *  1) Check for a Squadify cookie, if not => login
     *  2) Check the user's credentials against DB, if bad => clear and login
     *  3) Check for a queue_id in the cookie, if not => queues
     *  4) Check that the queue_id is valid, if not => clear queue_id and queues
     * @return Squadify object
     */
    router: function (req, res) {
        if(process.env.PRODUCTION == "TRUE") {
            console.log("PRODUCTION OVERRIDE!!!!!");
            User.findOne({id: "12120298224"}, (err, user) => {
                db.getQueuesForUser(user, (queues) => {
                    queues.map((queue) => {
                        if(queue.id == "REAMER") {
                            res.json({
                                Squadify: {
                                    user: user,
                                    queue: queue
                                }
                            });
                        }
                    })
                })
            });
        } else if (req.cookies == null || req.cookies.Squadify == null) {
            console.log("NULL SQUADIFY");
            res.json({ Squadify: null });
        } else if (req.cookies.Squadify.user_id == null || req.cookies.Squadify.access_token == null || req.cookies.Squadify.refresh_token == null || req.cookies.Squadify.server_token == null) {
            console.log("NULL VALUES");
            res.json({ Squadify: null });
        } else {
            User.findOne({ id: req.cookies.Squadify.user_id }, (error, user) => {
                if (error) throw error;
                else if (!user) {
                    console.log("NO USER!");
                    res.clearCookie("Squadify");
                    res.json({ Squadify: null });
                }
                else {
                    if (req.cookies.Squadify.access_token != user.access_token || req.cookies.Squadify.refresh_token != user.refresh_token || req.cookies.Squadify.server_token != user.server_token) {
                        console.log("BAD VALUES");
                        res.clearCookie("Squadify");
                        res.json({ Squadify: null });
                    } else {
                        var Squadify = {
                            user: {
                                id: user.id,
                                access_token: user.access_token,
                                refresh_token: user.refresh_token,
                                server_token: user.server_token,
                                display_name: user.display_name,
                                avatar_url: user.avatar_url
                            }
                        }
                        if (req.cookies.Squadify.queue_id != null) {
                            db.getQueuesForUser(user, (queues) => {
                                if (queues.some((queue) => queue.id == req.cookies.Squadify.queue_id)) {
                                    queues.map((queue) => {
                                        if (queue.id == req.cookies.Squadify.queue_id) {
                                            Squadify.queue = queue;
                                            res.json({ Squadify });
                                        }
                                    });
                                } else {
                                    res.cookie("Squadify", {
                                        user_id: user.id,
                                        access_token: user.access_token,
                                        refresh_token: user.refresh_token,
                                        server_token: user.server_token
                                    });
                                    res.json({ Squadify });
                                }
                            });
                        } else {
                            db.getQueuesForUser(user, (queues) => {
                                if(queues.length > 0) {
                                    Squadify.queue = queues[0];
                                    res.json({ Squadify });
                                } else {
                                    res.cookie("Squadify", {
                                        user_id: user.id,
                                        access_token: user.access_token,
                                        refresh_token: user.refresh_token,
                                        server_token: user.server_token
                                    });
                                    res.json({ Squadify });
                                }
                            });
                        }
                    }
                }
            });
        }
    },
    tryQueue: function (req, res) {
        db.checkUser(req.params.queue_id, req.query.user_id, req.query.server_token, (good, queue, user) => {
            if (good) {
                var Squadify = {
                    user: {
                        id: user.id,
                        access_token: user.access_token,
                        refresh_token: user.refresh_token,
                        server_token: user.server_token,
                        display_name: user.display_name,
                        avatar_url: user.avatar_url
                    }
                }
                db.getQueuesForUser(user, (queues) => {
                    if (queues.some((queue) => queue.id == req.params.queue_id)) {
                        res.cookie("Squadify", {
                            user_id: user.id,
                            access_token: user.access_token,
                            refresh_token: user.refresh_token,
                            server_token: user.server_token,
                            queue_id: queue.id
                        });
                        Squadify.queue = queue;
                        res.json({ Squadify });
                    } else {
                        res.json({ Squadify });
                    }
                })
            } else {
                res.json({ Squadify: null });
            }
        })
    }

}