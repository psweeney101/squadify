var Spotify = require("./Spotify.js");
var db = require("./mongo");
var Queue = require("./queue");
var User = require("./user");
var arrayMove = require("array-move");
var ObjectId = require("mongoose").Types.ObjectId;

exports = module.exports = function (io) {
    io.sockets.on("connection", function (socket) {

        /* INITIALIZE SOCKET WITH USER
         * @params Squadify object
         * STEPS:
         *  1) Check queue_id, user_id, and server_token are valid with DB
         *  2) Add socket to room
         *  3) Give the user the status, pin, host, and users
         *  @return status, pin, host, users, and socket room connection
         */
        socket.on("join", function (Squadify) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (good) {
                        console.log(`WELCOME ${Squadify.user.id}`);
                        socket.clientId = user.id;
                        socket.join(queue.id);
                        socket.emit("joined", {
                            queue: {
                                status: queue.status,
                                id: queue.id,
                                host: {
                                    id: queue.host.id,
                                    display_name: queue.host.display_name,
                                    avatar_url: queue.host.avatar_url
                                },
                                users: queue.users.map((user) => { return { id: user.id, display_name: user.display_name, avatar_url: user.avatar_url } }),
                                tracks: queue.tracks,
                                name: queue.name
                            },
                            user: {
                                id: user.id,
                                display_name: user.display_name,
                                avatar_url: user.avatar_url,
                                access_token: user.access_token,
                                refresh_token: user.refresh_token,
                                server_token: user.server_token
                            }
                        });
                    }
                });
            }
        });
        socket.on("add context playlist", function (Squadify, owner_id, playlist_id) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (good) {
                        var new_tracks = queue.tracks.filter(track => track.context == "Queued");
                        Spotify.Playlists.getPlaylist(queue.host.access_token, queue.host.refresh_token, owner_id, playlist_id, (playlist) => {
                            var playlist_tracks = playlist.body.tracks.items.filter(item =>
                                !new_tracks.some(track => track.id == item.track.id)
                            ).map((item) => {
                                return {
                                    id: item.track.id,
                                    added_by: user,
                                    context: playlist.body.uri,
                                    added: new Date(),
                                    name: item.track.name,
                                    artist: item.track.artists[0] != null ? item.track.artists[0].name : null
                                };
                            });
                            Queue.findOneAndUpdate({ id: queue.id }, { $pull: { tracks: { context: { $not: /Queued/ } } } }, (err, doc, res) => {
                                Queue.findOneAndUpdate({ id: queue.id }, { $addToSet: { tracks: playlist_tracks } }, { new: true }).populate("tracks.added_by", "id display_name avatar_url").exec((err, queue, res) => {
                                    io.to(queue.id).emit("tracks updated", queue.tracks);
                                    io.to(queue.id).emit("context updated", playlist.body.uri, playlist.body.name);
                                });
                            });
                        });
                    }
                });
            }
        });

        socket.on("remove context playlist", function (Squadify) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (good) {
                        Queue.findOneAndUpdate({ id: queue.id }, { $pull: { tracks: { context: { $not: /Queued/ } } } }, {new: true}).populate("tracks.added_by", "id display_name avatar_url").exec((err, queue, res) => {
                            io.to(queue.id).emit("tracks updated", queue.tracks);
                            io.to(queue.id).emit("context updated", null, null);
                        });
                    };
                });
            }
        });

        /* REMOVE USER FROM QUEUE
         * @params Squadify, user_id
         * STEPS:
         *  1) Check Squadify object
         *  2) Find to-be-kicked user in DB
         *  3) Remove user from user-array and save
         *  4) Broadcast new user array
         */
        socket.on("kick user", function (Squadify, user_id) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (good && queue.host.id == user.id) {
                        User.findOne({ id: user_id }, (error, user_to_remove) => {
                            console.log(user_to_remove.id);
                            if (error) throw error;
                            else if (user_to_remove != null) {
                                queue.users.remove(user_to_remove);
                                queue.save(() => {
                                    console.log(user.id + " removed " + user_id);
                                    io.to(queue.id).emit("users updated", queue.users.map((user) => { return { id: user.id, display_name: user.display_name, avatar_url: user.avatar_url } }));
                                });
                            }
                        });
                    }
                });
            }
        });

        /* ADD A SONG TO THE QUEUE
         * @params Squadify object, track_uri
         * STEPS:
         *  1) Check the queue_id, user_id, and server_token are valid with DB
         *  2) Iterate through the queue's track and ensure there is not a duplicate
         *  3) Save the track in the DB
         * @return emit boolean, broadcast uri
         */
        socket.on("track add", function (Squadify, id) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null && id != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (!queue.tracks.some(e => e.id == id)) {
                        Spotify.Tracks.getTrack(queue.host.access_token, queue.host.refresh_token, id, (track) => {
                            var index = -1;
                            for(var i = 0; i < queue.tracks.length; i++) {
                                if(queue.tracks[i].context == "Queued") {
                                    index = Math.max(index, i);
                                }
                            }
                            queue.tracks.splice(index + 1, 0, {
                                id: id,
                                added_by: user,
                                name: track.body.name,
                                artist: track.body.artists[0] != null ? track.body.artists[0].name : null
                            });
                            queue.save(() => {
                                console.log(`ADD TRACK WITH ID ${id}`);
                                io.to(queue.id).emit("tracks updated", queue.tracks);
                            })
                        })
                    }
                });
            }
        });

        socket.on("up next track", function (Squadify, id) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null && id != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (!queue.tracks.some(e => e.id == id)) {
                        Spotify.Tracks.getTrack(queue.host.access_token, queue.host.refresh_token, id, (track) => {
                            queue.tracks.unshift({
                                id: id,
                                added_by: user,
                                name: track.body.name,
                                artist: track.body.artists[0] != null ? track.body.artists[0].name : null
                            });
                            queue.save((err, queue) => {
                                io.to(queue.id).emit("tracks updated", queue.tracks);
                            })
                        })
                    }
                });
            }
        });

        /* REMOVE A SONG FROM THE QUEUE
         * @params Squadify object, track_uri
         * STEPS:
         *  1) Check the queue_id, user_id, and server_token are valid with DB
         *  2) Remove the track from the DB
         * @return emit boolean, broadcast uri
         */
        socket.on("track remove", function (Squadify, id) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null && id != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (queue.tracks.some(e => e.id == id)) {
                        Queue.findOneAndUpdate({ id: queue.id }, { $pull: { tracks: { id: id } } }, { new: true }).populate("tracks.added_by", "id display_name avatar_url").exec((err, queue, result) => {
                            console.log(`REMOVE TRACK WITH ID ${id}`);
                            io.to(queue.id).emit("tracks updated", queue.tracks);
                        });
                    }
                });
            }
        });

        /* REORDER TRACKS IN THE QUEUE
         * @params Squadify object
         * STEPS:
         *  1) Check the queue_id, user_id, and server_token are valid with DB
         *  2) Overwrite the tracks object in the queue
         * @return emit boolean, broadcast uri
         */
        socket.on("track move", function (Squadify, oldIndex, newIndex) {
            if (Squadify != null && Squadify.user != null && Squadify.queue != null && oldIndex != null && newIndex != null) {
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    Queue.findOneAndUpdate({ id: queue.id }, { tracks: arrayMove(queue.tracks, oldIndex, newIndex) }, { new: true }).populate("tracks.added_by", "id display_name avatar_url").exec((err, queue, result) => {
                        console.log(`MOVE FROM ${oldIndex} TO ${newIndex}`);
                        io.to(queue.id).emit("tracks updated", queue.tracks);
                    });
                });
            }
        })

        /* START THE QUEUE
         * @params Squadify object, device_id
         * STEPS:
         *  1) Verify the user's credentials as host in inactive queue with at least one track
         *  2) Remove the first track in DB and save its ID and new interval_id with active status
         *  3) Play the first track in queue
         *  4) Start QueueManager Interval
         *  @return status update
         */
        socket.on("start", function (Squadify, device_id) {
            // STEP 1
            if (Squadify != null && Squadify.user != null && Squadify.queue != null) {
                console.log(`START REQUESTED BY ${Squadify.user.id} IN ${Squadify.queue.id}`);
                db.checkUser(Squadify.queue.id, Squadify.user.id, Squadify.user.server_token, (good, queue, user) => {
                    if (good && queue.host.id == user.id && queue.status == "inactive" && queue.tracks.length > 0) {
                        // STEP 2
                        var curr_track_id = queue.tracks[0].id;
                        var interval_id = new Date().getTime().toString();
                        Queue.findOneAndUpdate({ id: queue.id }, { $pull: { tracks: { id: curr_track_id } }, interval_id: interval_id, status: "active" }, { new: true }).populate("tracks.added_by", "id display_name avatar_url").exec((error, q, res) => {
                            io.to(queue.id).emit("status updated", "active");
                            if (!error) {
                                console.log(`REMOVED TRACK ${curr_track_id}`)
                                io.to(queue.id).emit("tracks updated", q.tracks);
                                // STEP 3
                                Spotify.Player.play(queue.host.access_token, queue.host.refresh_token, "spotify:track:" + curr_track_id, device_id, (play) => {
                                    console.log(`STARTED PLAYING`);
                                    if (!play.error) {
                                        // STEP 4
                                        var interval = setInterval(() => QueueManager(queue.id, interval_id, curr_track_id, io, (shouldEnd, new_track_id) => {
                                            if (shouldEnd) {
                                                clearInterval(interval);
                                                return;
                                            } else {
                                                curr_track_id = new_track_id;
                                            }
                                        }), 2000);
                                    } else {
                                        console.log("HOST WENT INACTIVE! Error in Step 3");
                                        setInactive(queue.id, io);
                                        return;
                                    }
                                });
                            } else {
                                console.log("HOST WENT INACTIVE! Error in step 2");
                                setInactive(queue.id, io);
                                return;
                            }
                        });

                    }
                });
            }
        });
    });
}

/* QUEUE MANAGER
 *
 * 1) Ensure the interval_id is the same as that of the DB's
 * 2) Get Host's Player from Spotify
 *      - If null OR different track, END
 * 3) Check if progress is 0 and not playing
 *      - If not, continue
 * 4) Remove first track from DB
 * 5) Play that track on Spotify and REPEAT
 */
function QueueManager(queue_id, interval_id, init_track_id, io, cb) {
    var curr_track_id = init_track_id
    Queue.findOne({ id: queue_id }).populate("host").populate("tracks.added_by").exec((error, queue) => {
        // STEP 1
        console.log(`COMPARING THIS ${interval_id} TO ${queue.interval_id}`);
        if (queue.interval_id != interval_id) {
            return cb(true, null);
        } else {
            // STEP 2
            Spotify.Player.getCurrentPlayer(queue.host.access_token, queue.host.refresh_token, (player) => {
                if (player == null || player.body == null || player.body.item == null || player.body.item.id != curr_track_id) {
                    console.log("HOST WENT INACTIVE! Player null");
                    setInactive(queue.id, io);
                    return cb(true, null);
                } else {
                    io.to(queue.id).emit("player updated", player.body);
                    // STEP 3
                    if (player.body.progress_ms == 0 && !player.body.is_playing) {
                        // STEP 4
                        if (queue.tracks.length > 0) {
                            var new_track_id = queue.tracks[0].id;
                            console.log(`QUEUE UP ${new_track_id}`);
                            Queue.findOneAndUpdate({ id: queue_id }, { $pull: { tracks: { id: new_track_id } } }, { new: true }).populate("tracks.added_by", "id display_name avatar_url").exec((error, q, res) => {
                                if (!error) {
                                    io.to(queue.id).emit("tracks updated", q.tracks);
                                    // STEP 5
                                    console.log(`Attempting to play ${new_track_id}`);
                                    Spotify.Player.play(queue.host.access_token, queue.host.refresh_token, "spotify:track:" + new_track_id, null, (play) => {
                                        if (!play.error) {
                                            return cb(false, new_track_id);
                                        } else {
                                            console.log("HOST WENT INACTIVE! Error in step 5");
                                            setInactive(queue.id, io);
                                            return cb(true, null);
                                        }
                                    });
                                } else {
                                    console.log("HOST WENT INACTIVE! Error in step 4bb");
                                    setInactive(queue.id, io);
                                    return cb(true, null);
                                }
                            });
                        } else {
                            console.log("HOST WENT INACTIVE! Error in step 4ba");
                            setInactive(queue.id, io);
                            return cb(true, null);
                        }
                    } else {
                        console.log("KEEP GOING!");
                        return cb(false, curr_track_id);
                    }
                }
            });
        }
    });
}

function setInactive(queue_id, io) {
    Queue.findOneAndUpdate({ id: queue_id }, { status: "inactive" }, (error, q, res) => {
        io.to(queue_id).emit("status updated", "inactive");
    });
}