var Spotify = require("../spotify");
var db = require("../mongo");
var User = require("../user");
var Queue = require("../queue");

module.exports = {

    /* CREATE NEW QUEUE
     * @params user_id, server_token, name
     * STEPS:
     *  1) Find the user by ID and ensure server_token is valid
     *  2) Create new queue object using user object and name
     *  3) Save the queue and return it
     * @return queue
     */
    createQueue: function (req, res) {
        if (req.body.name && req.body.user_id && req.body.server_token) {
            User.findOne({ id: req.body.user_id }, (error, user) => {
                if (error) throw error;
                else if (!user) res.json({ error: true, why: "User not found" });
                else if (user.server_token != req.body.server_token) res.json({ error: true, why: "Invalid credentials" });
                else {
                    var newQueue = new Queue({ host: user, name: req.body.name });
                    newQueue.save((error, queue) => {
                        if (error) throw error;
                        else if (!queue) res.json({ error: true, why: "Error creating queue" });
                        else {
                            res.json(queue);
                        }
                    })
                }
            });
        } else {
            res.json({ good: false, why: "Missing arguments" });
        }
    },

    /* JOIN A USER TO A QUEUE
     * @params user_id, queue_id, server_token
     * STEPS:
     *  1) Verify the user's user_id and server_token
     *  2) Find the queue
     *  3) Ensure the user is not already in the queue
     *  4) Add the user to the queue
     * @return queue_id
     */
    joinQueue: function (req, res) {
        if (req.body.user_id && req.body.server_token && req.params.queue_id) {
            User.findOne({ id: req.body.user_id }, (error, user) => {
                if (error) throw error;
                else if (!user) res.json({ error: true, why: "User not found" });
                else if (user.server_token != req.body.server_token) res.json({ error: true, why: "Invalid credentials" });
                else {
                    Queue.findOne({ id: req.params.queue_id.toUpperCase() }).populate("host").populate("users").exec((error, queue) => {
                        if (error) throw error;
                        else if (!queue) res.json({ error: true, why: "Queue does not exist" });
                        else {
                            if (queue.host.id == user.id || queue.users.some(e => e.id == user.id)) {
                                res.json({ error: true, why: "User is already in queue" });
                            } else {
                                Queue.findOneAndUpdate({ id: queue.id }, { $push: { users: user } }, { new: true }).populate("users").exec((err, queue, response) => {
                                    if (error) throw error;
                                    else if (!queue) res.json({ error: true, why: "There was an error adding the user to the queue" });
                                    else {
                                        res.json({ id: queue.id });
                                        req.app.io.to(queue.id).emit("users updated", queue.users.map((user) => { return { id: user.id, display_name: user.display_name, avatar_url: user.avatar_url } }));
                                    }
                                });
                            }
                        }
                    })
                }
            });
        } else {
            res.json({ good: false, why: "Missing arguments" });
        }
    }
}