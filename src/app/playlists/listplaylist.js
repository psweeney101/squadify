import React from "react";
import ShowPlaylist from "./showplaylist";
import noImage from "../../images/missingCoverArt.png";

class ListPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            props.pages.addPage(
                <ShowPlaylist owner_id={props.playlist.owner.id} id={props.playlist.id} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            );
        }
    };
    render() {
        if (this.props.playlist != null) {
            return (
                <div className="middle aligned row" style={row} onClick={this.onClick.bind()}>
                    <div className="three wide column" style={imageColumn}>
                        <img alt="playlist" className="ui mini image" src={this.props.playlist.images[0] != null ? this.props.playlist.images[0].url : noImage} />
                    </div>
                    <div className="eleven wide column" style={col}>
                        <span style={name}>{this.props.playlist.name}</span><br />
                        <span style={user}>{this.props.playlist.tracks.total} TRACKS</span>
                    </div>
                    <div className="two wide column" style={column}>
                        <i className="large ui angle right icon" />
                    </div>
                </div>
            )
        } else {
            return null;
        }
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

var user = {
    fontSize: ".8em",
    color: "#BBBBBB",
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

export default ListPlaylist;