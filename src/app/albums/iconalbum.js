import React from 'react';
import ShowAlbum from "./showalbum";
import noImage from '../../images/missingCoverArt.png';

class IconAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: null
        };
        props.Squadify.getAlbum(props.id, (album) => {
            this.setState({ album: album });
        });
        this.onClick = () => {
            props.pages.addPage(
                <ShowAlbum owner_id={props.owner_id} id={props.id} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            )
        }
    }
    render() {
        if (this.state.album != null) {
            let imageUrl = null;
            if (this.state.album.images[0] != null) {
                imageUrl = this.state.album.images[0].url;
            } else {
                imageUrl = noImage;
            }
            return (
                <div style={column}>
                    <div style={albumBox} onClick={this.onClick.bind()}>
                        <img style={image} className="tiny ui image" src={imageUrl} alt="Album" />
                        <span style={playlist}>{this.state.album.name}</span> <br />
                        <span style={artist}>{this.state.album.artists[0].name}</span>
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