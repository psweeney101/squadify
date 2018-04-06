var Spotify = require("../spotify");
var db = require("../mongo");
var User = require("../user");

module.exports = {

    /* CHECK IF USER IS ALLOWED IN QUEUE
     * @params user_id, server_token
     * STEPS:
     *  1) Find user in DB by user_id
     *  2) Get the queues for the user in DB
     *  3) Check if queue_id is in queues for user
     *  4) Tell the client if the user is allowed in queue
     * @return boolean
     */
    checkIfInQueue: function (req, res) {
        if (req.query.user_id && req.query.server_token) {
            User.findOne({ id: req.query.user_id }, function (error, user) {
                if (error) throw error;
                else if (!user) res.json({ good: false, why: "User not found" });
                else if (user.server_token != req.query.server_token) res.json({ good: false, why: "Invalid credentials" });
                else {
                    db.getQueuesForUser(user, (queues) => {
                        if (queues.some(e => e.id === req.params.queue_id)) {
                            res.json({ good: true });
                        } else {
                            res.json({ good: false, why: "User is not in queue" });
                        }
                    })
                }
            })
        } else {
            res.json({ good: false, why: "Missing arguments" });
        }
    },

    /* GET A LIST OF QUEUES THE USER IS IN
     * @params user_id, server_token
     * STEPS:
     *  1) Verify the users by user_id and server_token
     *  2) Return an array of the queues the user is in
     * @return an array of queues 
     */
    getQueues: function (req, res) {
        if (req.query.user_id && req.query.server_token) {
            User.findOne({ id: req.query.user_id }, function (error, user) {
                if (error) throw error;
                else if (!user) res.json({ error: true, why: "User not found" });
                else if (user.server_token != req.query.server_token) res.json({ error: true, why: "Invalid credentials" });
                else {
                    db.getQueuesForUser(user, (queues) => {
                        res.json(queues.map((queue) => {
                            return {
                                id: queue.id,
                                host: queue.host.id,
                                name: queue.name,
                                status: queue.status,
                                created_at: queue.createdAt,
                                users: queue.users.map((user) => { return user.id })
                            }
                        }));
                    })
                }
            })
        } else {
            res.json({ error: true, why: "Missing arguments" });
        }
    }
}