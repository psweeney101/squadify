var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookiesMiddleware = require("universal-cookie-express");
var dotenv = require("dotenv").config();
var port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cookiesMiddleware());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/", express.static("./build"));
app.use("/queues", express.static("./build"));
app.use("/queue/:queue_id", express.static("./build"));
app.use("/logout", express.static("./build"));

var server = require("http").Server(app);
var io = require("socket.io").listen(server);
app.io = io;
server.listen(port);

require("./server/routes")(app);
require('./server/socket')(io);

mongoose.connect(process.env.DB_URL, function (error) {
    if (error) throw error;
    else {
        console.log("Connected to MongoDB!");
    }
});
exports = module.exports = app;