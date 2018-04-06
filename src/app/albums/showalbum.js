import React from "react";
import ListTrack from "../tracks/listtrack";
import noImage from "../../images/missingCoverArt.png";

class ShowAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: null
        }
        props.Squadify.getAlbum(props.id, (album) => {
            album.tracks.items = album.tracks.items.map((track) => {
                track.album = {
                    name: album.name,
                    images: album.images
                };
                return track;
            });
            this.setState({ album: album });
        });
    }
    render() {
        if (this.state.album != null) {
            return (
                <div style={wrapper}>
                    <div className="ui grid" style={grid}>
                        <div className="row" style={row}>
                            <div className="two wide column">
                                <i className="large ui angle left icon" onClick={this.props.pages.removePage.bind()} />
                            </div>
                            <div className="twelve wide column" style={column}>
                                <div style={albumBox}>
                                    <img style={image} className="small ui image" src={this.state.album.images[0] != null ? this.state.album.images[0].url : noImage} alt="Album" />
                                    <span style={album}>{this.state.album.name}</span> <br />
                                    <span style={artist}>{this.state.album.artists[0].name}</span>
                                </div>
                            </div>
                        </div>
                        {this.state.album.tracks.items.map((track) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} track={track} key={track.id} />)}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

var wrapper = {
    color: "white",
    overflowY: "scroll",
    position: "fixed",
    display: "block",
    maxHeight: "100%",
    maxWidth: "700px",
    top: "60px",
    bottom: "100px",
    width: "100%"
};

var albumBox = {
    textAlign: "center",
    whiteSpace: "nowrap"
}

var image = {
    margin: "0 auto",
}

var album = {
    margin: "0 auto",
    fontSize: "1em"
}

var artist = {
    margin: "0 auto",
    fontSize: "0.8em",
    color: "#999999"
}

var grid = {
    margin: "0 auto",
    width: "95%"
}

var row = {
    paddingBottom: "5px"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export default ShowAlbum;