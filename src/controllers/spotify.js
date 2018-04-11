import axios from "axios";
const url = "https://api.spotify.com/v1";

var Spotify = {
    getFeaturedPlaylists: function(Squadify, cb) {
        axios.get(url + '/browse/featured-playlists', {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function (response) {
            //console.log("GET FEATURED PLAYLISTS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getFeaturedPlaylists(newSquadify, cb);
            });
        });
    },
    getNewReleases: function(Squadify, cb) {
        axios.get(url + '/browse/new-releases', {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function (response) {
            //console.log("GET NEW RELEASES:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getNewReleases(newSquadify, cb);
            });
        });
    },
    getCategories: function(Squadify, cb) {
        axios.get(url + '/browse/categories', {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function (response) {
            //console.log("GET CATEGORIES:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getCategories(newSquadify, cb);
            });
        });
    },
    getQueuePlaylist: function(Squadify, cb) {
        axios.get(url + '/users/' + Squadify.user.id + '/playlists/' + Squadify.queue.id, {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET QUEUE PLAYLIST:");
            //console.dir(response.data);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getQueuePlaylist(newSquadify, cb);
            });
        });
    },
    getAlbum: function(Squadify, id, cb) {
        axios.get(url + '/albums/' + id, {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET ALBUM:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getAlbum(newSquadify, id, cb);
            });
        });
    },
    getPlaylist: function(Squadify, owner_id, playlist_id, cb) {
        axios.get(url + '/users/' + owner_id + '/playlists/' + playlist_id, {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET PLAYLIST:");
            //console.dir(response.data);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getPlaylist(Squadify, owner_id, playlist_id, cb);
            });
        });
    },
    getCategory: function(Squadify, id, cb) {
        axios.get(url + '/browse/categories/' + id, {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET CATEGORY:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getCategory(Squadify, id, cb);
            });
        });
    },
    getCategoryPlaylists: function(Squadify, id, cb) {
        axios.get(url + "/browse/categories/" + id + "/playlists", {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET CATEGORY PLAYLISTS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getCategoryPlaylists(Squadify, id, cb);
            });
        });
    },
    getTrack: function(Squadify, id, cb) {
        axios.get(url + '/tracks/' + id, {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET TRACK:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getTrack(Squadify, id, cb);
            });
        });
    },
    getSavedTracks: function(Squadify, cb) {
        axios.get(url + '/me/tracks?limit=50', {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET SAVED TRACKS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getSavedTracks(Squadify, cb);
            });
        });
    },
    getSavedAlbums: function(Squadify, cb) {
        axios.get(url + '/me/albums?limit=50', {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET SAVED ALBUMS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getSavedAlbums(Squadify, cb);
            });
        });
    },
    getSavedPlaylists: function(Squadify, cb) {
        axios.get(url + '/me/playlists?limit=50', {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET SAVED PLAYLISTS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getSavedPlaylists(Squadify, cb);
            });
        });
    },
    getTopTracks: function(Squadify, cb) {
        axios.get(url + "/me/top/tracks", {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET TOP TRACKS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getTopTracks(Squadify, cb);
            });
        });
    },
    getRecentlyPlayed: function(Squadify, cb) {
        axios.get(url + "/me/player/recently-played", {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET RECENTLY PLAYED:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getRecentlyPlayed(Squadify, cb);
            });
        });
    },
    search: function(Squadify, q, cb) {
        axios.get(url + '/search?limit=50&type=album,playlist,track&q=' + encodeURIComponent(q), {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("SEARCH:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.search(Squadify, q, cb);
            });
        });
    },
    getProfile: function(Squadify, id, cb) {
        axios.get(url + '/users/' + id, {
            headers: {
                'Authorization': 'Bearer ' + Squadify.user.access_token
            }
        }).then(function(response) {
            //console.log("GET PROFILE");
            //console.dir(response);
            return cb(response.data);
        }).catch(function(error) {
            Spotify.handleError(error, Squadify, (newSquadify) => {
                Spotify.getProfile(Squadify, id, cb);
            });
        });
    },
    handleError: function(error, Squadify, cb) {
        if(error != null && error.response != null && error.response.data != null && error.response.data.error != null) {
            if(error.response.data.error.message === "The access token expired") {
                Squadify.getNewAccessToken((newSquadify) => {
                    return cb(newSquadify);
                });
            } else {
                //console.dir(error);
            }
        } else {
            //console.dir(error);
        }
    }
    
}

export default Spotify;