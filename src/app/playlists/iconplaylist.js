import React from "react";
import ShowPlaylist from "./showplaylist";
import noImage from '../../images/missingCoverArt.png';

class IconPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null
        };
        props.Squadify.getPlaylist(props.owner_id, props.id, (playlist) => {
            this.setState({ playlist: playlist });
        });
        this.onClick = () => {
            props.pages.addPage(
                <ShowPlaylist owner_id={props.owner_id} id={props.id} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            );
        }
    }
    render() {
        if (this.state.playlist != null) {
            return (
                <div style={column}>
                    <div style={playlistBox} onClick={this.onClick.bind()}>
                        <img style={image} className="tiny ui image" src={this.state.playlist.images[0] != null ? this.state.playlist.images[0].url : noImage} alt="Playlist" />
                        <span style={playlist}>{this.state.playlist.name}</span> <br />
                        <span style={user}>{this.state.playlist.tracks.total.toLocaleString()} TRACKS</span>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

var playlistBox = {
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var image = {
    margin: "0 auto",
    width: "125px"
}

var playlist = {
    margin: "0 auto",
    fontSize: "50%"
}

var user = {
    margin: "0 auto",
    fontSize: "50%",
    color: "#999999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1em"
}

var column = {
    display: "inline-block",
    padding: "0px 10px 0px 10px",
    width: "150px"
}


export default IconPlaylist;