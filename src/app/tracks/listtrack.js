import React from "react";

class ListTrack extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = () => {
            props.socket.emit("track add", props.Squadify, props.track.id);
        }
        this.state = {
            tracks: props.Squadify.queue.tracks
        }
        props.socket.on("tracks updated", (tracks) => {
            this.setState({
                tracks: tracks
            });
        })
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            tracks: newProps.Squadify.queue.tracks
        });
    }
    render() {
        if (this.props.track != null && this.state.tracks != null) {
            if(this.state.tracks.some(e => e.id === this.props.track.id)) {
                this.add_icon = "green large ui plus circle icon";
            } else {
                this.add_icon = "large ui plus circle icon";
            }
            return (
                <div className="row" style={row}>
                    <div className="fourteen wide column" style={col}>
                        <span style={name}>{this.props.track.name}</span><br />
                        <span style={artist}>{this.props.track.artists[0].name}&nbsp;<span style={dot}>●</span>&nbsp;{this.props.track.album.name}</span>
                    </div>
                    <div className="two wide column" style={column} onClick={this.addTrack.bind()}>
                        <i className={this.add_icon} />
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