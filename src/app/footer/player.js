import React from "react";

class Player extends React.Component {
    render() {
        if (this.props.Squadify.queue.player != null && this.props.Squadify.queue.player.item != null) {
            return (
                <div className="row" style={row}>
                    <div className="three wide column" style={column}>
                        <button className="mini ui inverted basic circular icon button">
                            <i className="angle up icon"></i>
                        </button>
                    </div>
                    <div className="ten wide column" style={column}>
                        <span style={song}>{this.props.Squadify.queue.player.item.name}</span>&nbsp;<span style={dot}>●</span>&nbsp;<span style={artist}>{this.props.Squadify.queue.player.item.artists[0].name}</span>
                    </div>
                    <div className="three wide column" style={column}>
                        <button className="mini ui inverted basic circular icon button">
                            <i className={this.props.Squadify.queue.player.is_playing ? "pause icon" : "play icon"}></i>
                        </button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

var row = {
    padding: "0 0 0 0",
    height: "40px",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "#888"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var song = {
    fontSize: "0.9em",
    color: "white",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var dot = {
    fontSize: "0.5em",
    color: "white"
}

var artist = {
    fontSize: "0.9em",
    color: "#999999",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

export default Player;