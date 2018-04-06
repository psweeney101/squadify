//import Server from "./server";
import Spotify from "./spotify.js";

class Queue {
    constructor(queue_id) {
        // Index.js login
        this.id = queue_id;
        // Socket init
        this.status = null;
        this.pin = null;
        this.host = null;
        this.users = null;
        this.name = null;
        // Socket
        this.tracks = null;
        // Socket loop
        this.player = null;
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