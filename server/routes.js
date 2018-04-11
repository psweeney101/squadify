var Callback = require("./routes/callback");
var Tokens = require("./routes/tokens");
var User = require("./routes/user.js");
var Player = require("./routes/player");
var Queue = require("./routes/queue");
var Router = require("./routes/router");
module.exports = function (app) {
    // CALLBACK
    app.route("/callback").get(Callback.callback);

    // TOKENS
    app.route("/api/tokens/refresh").post(Tokens.refresh);
    app.route("/api/tokens/check").get(Tokens.check);

    // ROUTER
    app.route("/api/router").get(Router.router);
    app.route("/api/router/queue/:queue_id").get(Router.tryQueue);
    app.get("/logout", (req,res) => {
        console.log("Logging out!");
        res.cookie("Squadify", null);
        res.redirect("/");
    });

    // USER
    app.route("/api/user/queue/:queue_id/check").get(User.checkIfInQueue);
    app.route("/api/user/queues").get(User.getQueues);
    
    // PLAYER
    app.route("/api/queue/:queue_id/devices").get(Player.getDevices);

    // QUEUE
    app.route("/api/queue").post(Queue.createQueue);
    app.route("/api/queue/:queue_id/join").post(Queue.joinQueue);

    app.use(function (req, res, next) {
        res.status(404);
        if (req.accepts('html')) {
            res.redirect(redirectURL);
        }
        else {
            res.send({ error: true, why: 'Page not found' });
        }
    });
}