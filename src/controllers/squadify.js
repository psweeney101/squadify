import User from "./user";
import Queue from "./queue";
import Spotify from "./spotify";

class Squadify {
    constructor(object) {
        if (object != null) {
            if (object.user != null) {
                this.user = new User(object.user);
            }
            if (object.queue != null) {
                this.queue = new Queue(object.queue);
            }
        }
    }

    // GETTERS
    getQueuePlaylist = () => {
        if (this.queue != null) {
            this.queue.getQueuePlaylist(this, () => {
                this.setState(this);
            });
        }
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
    getTopTracks = (cb) => {
        Spotify.getTopTracks(this, (tracks) => {
            return cb(tracks);
        })
    }
    getRecentlyPlayedTracks = (cb) => {
        Spotify.getRecentlyPlayed(this, (tracks) => {
            return cb(tracks);
        });
    }
    getProfile = (id, cb) => {
        Spotify.getProfile(this, id, (profile) => {
            return cb(profile);
        })
    }
    isHost = () => {
        return this.user.id === this.queue.host.id;
    }
    // SETTERS
    setQueueId = (id) => {
        if (this.queue != null) {
            this.queue.id = id;
        }
    }
    setInfo = (info) => {
        if (this.queue != null) {
            this.queue.status = info.queue.status;
            this.queue.id = info.queue.id;
            this.queue.host = info.queue.host;
            this.queue.users = info.queue.users;
            this.queue.tracks = info.queue.tracks;
            this.queue.name = info.queue.name;
        }
        if (this.user != null) {
            this.user.id = info.user.id;
            this.user.display_name = info.user.display_name;
            this.user.avatar_url = info.user.avatar_url;
            this.user.access_token = info.user.access_token;
            this.user.refresh_token = info.user.refresh_token;
            this.user.server_token = info.user.server_token;
        }
        this.setState(this);
    }
    setStatus = (status) => {
        if (this.queue != null) {
            this.queue.setStatus(status);
            this.setState(this);
        }
    }
    setUsers = (users) => {
        if (this.queue != null) {
            this.queue.setUsers(users);
            this.setState(this);
        }
    }
    setTracks = (tracks) => {
        if (this.queue != null) {
            this.queue.setTracks(tracks);
            this.setState(this);
        }
    }
    setPlayer = (player) => {
        if (this.queue != null) {
            this.queue.setPlayer(player);
            this.setState(this);
        }
    }
    getNewAccessToken = (cb) => {
        if (this.user != null) {
            this.user.getNewAccessToken(() => {
                this.setState(this);
                return cb(this);
            });
        }
    }
}

export default Squadify;