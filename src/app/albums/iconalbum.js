import React from 'react';
import ShowAlbum from "./showalbum";
import noImage from '../../images/missingCoverArt.png';

class IconAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            props.pages.addPage(
                <ShowAlbum id={props.album.id} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            )
        }
    }
    render() {
        if (this.props.album != null) {
            return (
                <div style={column}>
                    <div style={albumBox} onClick={this.onClick.bind()}>
                        <img style={image} className="tiny ui image" src={this.props.album.images[0] != null ? this.props.album.images[0].url : noImage } alt="Album" />
                        <span style={playlist}>{this.props.album.name}</span> <br />
                        <span style={artist}>{this.props.album.artists[0].name}</span>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

var albumBox = {
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

var artist = {
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
    width: "150px",
    wordBreak: "normal"
}

export default IconAlbum;