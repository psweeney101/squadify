import React from "react";
import ListPlaylist from "../playlists/listplaylist";
import noImage from "../../images/missingCoverArt.png";

class ShowAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: null
        }
        props.Squadify.getCategoryPlaylists(props.category.id, (response) => {
            this.setState({
                playlists: response.playlists.items
            });
        });
    }
    render() {
        if (this.state.playlists != null) {
            return (
                <div style={wrapper}>
                    <div className="ui grid" style={grid}>
                        <div className="row" style={row}>
                            <div className="two wide column">
                                <i className="large ui angle left icon" onClick={this.props.pages.removePage.bind()} />
                            </div>
                            <div className="twelve wide column" style={column}>
                                <div style={categoryBox}>
                                    <img style={image} className="small ui image" src={this.props.category.icons[0] != null ? this.props.category.icons[0].url : noImage} alt="Category" />
                                    <span style={name}>{this.props.category.name}</span> <br />
                                </div>
                            </div>
                        </div>
                        {this.state.playlists.map((playlist) => <ListPlaylist Squadify={this.props.Squadify} socket={this.props.socket} pages={this.props.pages} playlist={playlist} key={playlist.id} />)}
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

var categoryBox = {
    textAlign: "center",
    whiteSpace: "nowrap"
}

var image = {
    margin: "0 auto",
}

var name = {
    margin: "0 auto",
    fontSize: "1em"
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