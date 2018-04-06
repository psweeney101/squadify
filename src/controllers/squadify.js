import User from "./user";
import Queue from "./queue";
import Spotify from "./spotify";

class Squadify {
    constructor(user_id, queue_id, access_token, refresh_token, server_token) {
        if (user_id instanceof Squadify) {
            var a = user_id;
            this.user = new User(a.user.id, a.user.access_token, a.user.refresh_token, a.user.server_token);
            this.queue = new Queue(a.queue.id);
            this.page = 3;
        } else {
            this.user = new User(user_id, access_token, refresh_token, server_token);
            this.queue = new Queue(queue_id);
            this.page = 0;
        }
    }

    // GETTERS
    getQueuePlaylist = () => {
        this.queue.getQueuePlaylist(this, () => {
            this.setState(this);
        });
    }
    getNewReleases = (cb) => {
        Spotify.getNewReleases(this, (newReleases) => {
            return cb(newReleases);
        })
    }
    getFeaturedPlaylists = (cb) => {
        Spotify.getFeaturedPlaylists(this, (featuredPlaylists) => {
            return cb(featuredPlaylists);
        })
    }
    getCategories = (cb) => {
        Spotify.getCategories(this, (categories) => {
            return cb(categories);
        })
    }
    getAlbum = (id, cb) => {
        Spotify.getAlbum(this, id, (album) => {
            return cb(album);
        });
    }
    getPlaylist = (owner_id, playlist_id, cb) => {
        Spotify.getPlaylist(this, owner_id, playlist_id, (playlist) => {
            return cb(playlist);
        });
    }
    getCategory = (id, cb) => {
        Spotify.getCategory(this, id, (category) => {
            return cb(category);
        });
    }
    getCategoryPlaylists = (id, cb) => {
        Spotify.getCategoryPlaylists(this, id, (playlists) => {
            return cb(playlists);
        });
    }
    getTrack = (id, cb) => {
        Spotify.getTrack(this, id, (track) => {
            return cb(track);
        });
    }
    search = (keywords, cb) => {
        Spotify.search(this, keywords, (results) => {
            return cb(results);
        });
    }
    getSavedTracks = (cb) => {
        Spotify.getSavedTracks(this, (tracks) => {
            return cb(tracks);
        });
    }
    getSavedAlbums = (cb) => {
        Spotify.getSavedAlbums(this, (albums) => {
            return cb(albums);
        });
    }
    getSavedPlaylists = (cb) => {
        Spotify.getSavedPlaylists(this, (playlists) => {
            return cb(playlists);
        });
    }
    getProfile = (id, cb) => {
        Spotify.getProfile(this, id, (profile) => {
            return cb(profile);
        })
    }
    isHost = () => {
        return this.user.id === this.queue.host;
    }
    // SETTERS
    setQueueId = (id) => {
        this.queue.id = id;
    }
    setQueueInfo = (queue) => {
        this.queue.status = queue.status;
        this.queue.pin = queue.pin;
        this.queue.host = queue.host;
        this.queue.users = queue.users;
        this.queue.tracks = queue.tracks;
        this.queue.name = queue.name;
        this.setState(this);
    }
    setPage = (page) => {
        this.page = page;
        this.setState(this);
    }
    setStatus = (status) => {
        this.queue.setStatus(status);
        this.setState(this);
    }
    setUsers = (users) => {
        this.queue.setUsers(users);
        this.setState(this);
    }
    setTracks = (tracks) => {
        this.queue.setTracks(tracks);
        this.setState(this);
    }
    setPlayer = (player) => {
        this.queue.setPlayer(player);
        this.setState(this);
    }
    getNewAccessToken = (cb) => {
        this.user.getNewAccessToken(() => {
            return cb(this);
        });
    }
}

export default Squadify;