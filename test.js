var Spotify = require("./server/spotify");
var access_token = "BQBWShJ_fN4bWaG1ndE3uRjzQe6IhopbooZZG9rBAEmMND6-VPdVT6h4mWCpjtfCaN4QtHUbLPigLz_d_HnyDN5t2nCP4aNQf2n340NSY4G1xr_PydgZRE5zDCIt0emk16QdwZeULVSIfp9rHtTyI2kWKXea";
Spotify.Player.play(access_token, null, "spotify:track:7sG2bWi2eDtvX9vX8yC1Gn", null, (cb) => {
    if(cb.error == false) {
        setInterval(() => {
            Spotify.Player.getCurrentPlayer(access_token, null, (response) => {
                console.dir(response.body.is_playing);
                console.dir(response.body.progress_ms);
                console.dir(response.body.item.uri);
                if(response.body.is_playing == false && response.body.progress_ms == 0) {
                    Spotify.Player.play(access_token, null, "spotify:track:7sG2bWi2eDtvX9vX8yC1Gn", null, null);
                }
            });
        }, 1000)
    }
})
/*setInterval(() => {
    Spotify.Player.getCurrentPlayer(access_token, null, (response) => {
        console.dir(response.body.is_playing);
        console.dir(response.body.progress_ms);
        console.dir(response.body.item.uri);
    });
}, 1000);*/