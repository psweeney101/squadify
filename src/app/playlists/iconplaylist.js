import React from "react";
import ShowPlaylist from "./showplaylist";
import noImage from '../../images/missingCoverArt.png';

class IconPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            props.pages.addPage(
                <ShowPlaylist owner_id={props.playlist.owner.id} id={props.playlist.id} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            );
        }
    }
    render() {
        if (this.props.playlist != null) {
            return (
                <div style={column}>
                    <div style={playlistBox} onClick={this.onClick.bind()}>
                        <img style={image} className="tiny ui image" src={this.props.playlist.images[0] != null ? this.props.playlist.images[0].url : noImage} alt="Playlist" />
                        <span style={playlist}>{this.props.playlist.name}</span> <br />
                        <span style={user}>{this.props.playlist.tracks.total.toLocaleString()} TRACKS</span>
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