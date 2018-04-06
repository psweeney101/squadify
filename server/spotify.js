var request = require("request");
var baseURL = "https://api.spotify.com";
var Tokens = require("./spotify/tokens");
var Profiles = require("./spotify/profiles");
var Player = require("./spotify/player");
var Tracks = require("./spotify/tracks");

var Spotify = {
    Tokens,
    Profiles,
    Player,
    Tracks
}

module.exports = Spotify;