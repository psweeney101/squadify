var Callback = require("./routes/callback");
var Tokens = require("./routes/tokens");
var User = require("./routes/user.js");
var Player = require("./routes/player");
var Queue = require('./routes/queue')

module.exports = function (app) {
    // CALLBACK
    app.route("/callback").get(Callback.callback);

    // TOKENS
    app.route("/api/tokens/refresh").post(Tokens.refresh);
    app.route("/api/tokens/check").get(Tokens.check);

    // USER
    app.route("/api/user/queue/:queue_id/check").get(User.checkIfInQueue);
    app.route("/api/user/queues").get(User.getQueues);
    
    // PLAYER
    app.route("/api/queue/:queue_id/devices").get(Player.getDevices);

    // QUEUE
    app.route("/api/queue").post(Queue.createQueue);
    app.route("/api/queue/:queue_id/join").post(Queue.joinQueue);
}