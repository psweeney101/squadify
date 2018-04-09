var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var dotenv = require("dotenv").config();
var port = process.env.PORT || 4200;
var cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cookieParser(process.env.SESSION_SECRET, {
    maxAge: 86400000, // 24 hours,
    path: "/",
    domain: process.env.SUB_DOMAIN
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//app.use("/", express.static("./build"));
//app.use("/queues", express.static("./build"));
//app.use("/queue/:queue_id", express.static("./build"));
//app.use("/logout", express.static("./build"));

var server = require("http").Server(app);
var io = require("socket.io").listen(server);
app.io = io;
server.listen(port);
console.log("Listening on " + port);
require("./server/routes")(app);
require('./server/socket')(io);

mongoose.connect(process.env.DB_URL, function (error) {
    if (error) throw error;
    else {
        console.log("Connected to MongoDB!");
    }
});
exports = module.exports = app;