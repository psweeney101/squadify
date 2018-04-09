//import Server from "./server";
import Spotify from "./spotify.js";

class Queue {
    constructor(object) {
        if(object != null) {
            this.id = object.id;
            this.status = object.status;
            this.host = object.host;
            this.users = object.users;
            this.name = object.name;
            this.tracks = object.tracks;
            this.player = null;
        }
    }
    getQueuePlaylist = (Squadify, cb) => {
        Spotify.getQueuePlaylist(Squadify, (playlist) => {
            if (playlist != null && playlist.tracks != null && playlist.tracks.items != null) {
                this.tracks = playlist.tracks.items;
                this.name = playlist.name;
                return cb();
            }
        });
    }
    setStatus = (status) => {
        this.status = status;
    }
    setUsers = (users) => {
        this.users = users;
    }
    setTracks = (tracks) => {
        this.tracks = tracks;
    }
    setPlayer = (player) => {
        this.player = player;
    }
}

export default Queue;