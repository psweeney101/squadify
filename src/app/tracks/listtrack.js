import React from "react";

class ListTrack extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = () => {
            if (this.color === "white") {
                props.socket.emit("track add", props.Squadify, props.track.id);
            } else {
                props.socket.emit("track remove", props.Squadify, props.track.id);
            }
        }
        this.upNextTrack = () => {
            if (this.color === "white") {
                props.socket.emit("up next track", props.Squadify, props.track.id);
            } else {
                props.socket.emit("track remove", props.Squadify, props.track.id);
            }
        }
        this.removeTrack = () => {
            props.socket.emit("track remove", props.Squadify, props.track.id);
        }
        this.state = {
            tracks: props.Squadify.queue.tracks
        }
        this.socket = (tracks) => {
            this.setState({
                tracks: tracks
            });

        };
        this.props.socket.on("tracks updated", this.socket);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            tracks: newProps.Squadify.queue.tracks
        });
    }
    componentWillUnmount() {
        this.props.socket.removeListener("tracks updated", this.socket);
    }
    render() {
        if (this.props.track != null && this.state.tracks != null) {
            if (this.state.tracks.some(e => e.id === this.props.track.id && e.context !== "Queued")) {
                this.color = "orange";
            }
            else if (this.state.tracks.some(e => e.id === this.props.track.id)) {
                this.color = "green";
            } else {
                this.color = "white";
            }
            return (
                <div className="row" style={row}>
                    <div className="twelve wide column" style={col}>
                        <span style={name}>{this.props.track.name}</span><br />
                        <span style={artist}>{this.props.track.artists[0].name}&nbsp;<span style={dot}>●</span>&nbsp;{this.props.track.album.name}</span>
                    </div>
                    <div className="two wide column" style={column} onClick={this.upNextTrack.bind()}>
                        <i className="large ui arrow up icon" style={{ color: this.color }} />
                    </div>
                    <div className="two wide column" style={column} onClick={this.addTrack.bind()}>
                        <i className="large ui plus circle icon" style={{ color: this.color }} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

var row = {
    paddingBottom: "5px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var col = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

var dot = {
    fontSize: "0.5em",
    color: "white",
}

export default ListTrack;