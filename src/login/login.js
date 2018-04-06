import React from 'react';
import logo from '../images/logo.png';
import server from '../controllers/server.js';

var serverURL = server.url;

class login extends React.Component {
    render() {
        return (
            <div style={wrapper}>
                <div style={inner}>
                    <img style={img} src={logo} alt='QCollab' />
                    <br />
                    <button className="ui white button" onClick={redirectToSpotify}>
                        <i className="spotify icon"></i>
                        Login with Spotify
                    </button>
                </div>
            </div>
        );
    }
}

function redirectToSpotify() {
    var scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state user-library-read';
    var params = ''
        + 'response_type=' + encodeURIComponent('code')
        + '&client_id=' + encodeURIComponent('e9b8be288fa74164b0d370ee86697bcd')
        + '&scope=' + encodeURIComponent(scopes)
        + '&redirect_uri=' + encodeURIComponent(serverURL + '/callback');

    let url = 'https://accounts.spotify.com/authorize?' + params;
    window.location.href = url;
}

const wrapper = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    margin: "0 auto"
}

const inner = {
    textAlign: 'center'
}

const img = {
    height: '50%',
    maxHeight: '300px'
}

export default login;