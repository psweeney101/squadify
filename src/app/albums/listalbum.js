import React from "react";
import ShowAlbum from "./showalbum";
import noImage from "../../images/missingCoverArt.png";

class ListAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            props.pages.addPage(
                <ShowAlbum id={props.album.id} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            );
        }
    }
    render() {
        return (
            <div className="row" style={row} onClick={this.onClick.bind()} >
                <div className="three wide column" style={imageColumn}>
                    <img alt="album" className="ui mini image" src={this.props.album.images[0] != null ? this.props.album.images[0].url : noImage} />
                </div>
                <div className="eleven wide column" style={col}>
                    <span style={name}>{this.props.album.name}</span><br />
                    <span style={artist}>{this.props.album.artists[0].name}</span>
                </div>
                <div className="two wide column" style={column}>
                    <i className="large ui angle right icon" />
                </div>
            </ div>
        );
    }
}

var row = {
    paddingBottom: "5px"
}

var imageColumn = {
    display: "flex",
    alignItems: "center"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

var col = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var name = {
    fontSize: "1.0em",
    color: "white",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var artist = {
    fontSize: ".8em",
    color: "#BBBBBB",
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

export default ListAlbum;