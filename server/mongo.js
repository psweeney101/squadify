var User = require('./user.js');
var Queue = require('./queue.js');
var randtoken = require('rand-token');

var db = {
    createUser(id, display_name, images, access_token, refresh_token, cb) {
        User.findOne({ id: id }, function (error, user) {
            if (error) throw error;
            else if (user) {
                User.findOneAndUpdate({ id: id }, { access_token: access_token, refresh_token: refresh_token, display_name: display_name, avatar_url: images[0] != null ? images[0].url : null }, {new: true}, function (error, user, response) {
                    return cb(user);
                })
            } else {
                var newUser = new User({
                    id: id,
                    access_token: access_token,
                    refresh_token: refresh_token,
                    server_token: randtoken.generate(32),
                    display_name: display_name,
                    avatar_url: images[0] != null ? images[0].url : null
                });
                newUser.save(function (error, user) {
                    if (error) throw error;
                    return cb(user);
                })
            }
        })
    },
    checkUser(queue_id, user_id, server_token, cb) {
        User.findOne({ id: user_id }, function (error, user) {
            if (error) throw error;
            else if (!user) return cb(false);
            else if (user.server_token != server_token) return cb(false);
            else {
                Queue.findOne({ $and: [{ id: queue_id }, { $or: [{ host: user }, { users: user }] }] }).populate("host").populate("users").populate("tracks.added_by").exec(function (error, queue) {
                    if (error) throw error;
                    else if (!queue) return cb(false);
                    else return cb(true, queue, user);
                });
            }
        });
    },
    updateTokens(user_id, access_token, refresh_token, cb) {
        User.findOneAndUpdate({id: user_id}, {access_token: access_token, refresh_token: refresh_token}, {new: true}, function(error, user) {
            if(error) throw error;
            return cb(user);
        });
    },
    getQueuesForUser(user, cb) {
        Queue.find({ $or: [{ host: user._id }, { users: user._id }] }).populate("host", "id display_name avatar_url").populate("users", "id display_name avatar_url").populate("tracks.added_by", "id display_name avatar_url").select("id name status host users tracks createdAt").exec(function (error, queues) {
            if (error) throw error;
            var queueArray = [];
            for (var i = 0; i < queues.length; i++) {
                if(queues[i].status == "active") {
                    queueArray.push(queues[i]);
                }
            }
            for (var i = 0; i < queues.length; i++) {
                if(queues[i].status == "inactive") {
                    queueArray.push(queues[i]);
                }
            }
            return cb(queueArray);
        })
    }
}

module.exports = db;