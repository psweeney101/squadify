import React from "react";
import ListTrack from "../tracks/listtrack";
import noImage from "../../images/missingCoverArt.png";

class ShowPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: null
        };
        props.Squadify.getPlaylist(props.owner_id, props.id, (playlist) => {
            this.setState({ playlist: playlist });
            if (props.Squadify.queue.tracks != null) {
                if (props.Squadify.queue.tracks.some(e => e.context === playlist.uri)) {
                    this.setState({color: "orange"});
                } else {
                    this.setState({color: "white"});
                }
            }
        });
        this.addContext = () => {
            if(this.state.color === "orange" && props.Squadify.isHost()) {
                props.socket.emit("remove context playlist", props.Squadify);
            } else {
                props.socket.emit("add context playlist", props.Squadify, props.owner_id, props.id)
            }
        }
        this.socket = (context_uri, context_name) => {
            if (this.state.playlist != null && context_uri === this.state.playlist.uri) {
                this.setState({ color: "orange" });
            } else {
                this.setState({ color: "white" });
            }
        }
    }
    componentDidMount() {
        this.props.socket.on("context updated", this.socket);
    }
    componentWillUnmount() {
        this.props.socket.removeListener("context updated", this.socket);
    }
    componentWillReceiveProps(props) {
        if (props.Squadify.queue.tracks != null) {
            if (props.Squadify.queue.tracks.some(e => e.context !== "Queued")) {
                this.setState({ color: "orange" });
            } else {
                this.setState({ color: "white" });
            }
        }
    }
    render() {
        if (this.state.playlist != null) {
            return (
                <div style={wrapper}>
                    <div className="ui grid" style={grid}>
                        <div className="row" style={row}>
                            <div className="two wide column" onClick={this.props.pages.removePage.bind()}>
                                <i className="large ui angle left icon" />
                            </div>
                            <div className="twelve wide column" style={column}>
                                <div style={playlistBox}>
                                    <img style={image} className="small ui image" src={this.state.playlist.images[0] != null ? this.state.playlist.images[0].url : noImage} alt="Album" />
                                    <span style={playlist}>{this.state.playlist.name}</span> <br />
                                    <span style={user}>{this.state.playlist.followers.total.toLocaleString()} FOLLOWERS&nbsp;<span style={dot}>●</span>&nbsp;BY {this.state.playlist.owner.display_name != null ? this.state.playlist.owner.display_name.toUpperCase() : this.state.playlist.owner.id.toUpperCase()}</span>
                                    <span style={user}>{this.state.playlist.tracks.total.toLocaleString()} TRACKS</span>
                                </div>
                            </div>
                            <div className="two wide column" onClick={this.addContext.bind()}>
                                <i className="large ui linkify icon" style={{ color: this.state.color }} />
                            </div>
                        </div>
                        {this.state.playlist.tracks.items.map((item, index) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} track={item.track} key={item.track.id + ":" + index} />)}
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

var playlistBox = {
    textAlign: "center",
    whiteSpace: "nowrap"
}

var image = {
    margin: "0 auto",
}

var playlist = {
    margin: "0 auto",
    fontSize: "1em"
}

var user = {
    margin: "0 auto",
    fontSize: "0.8em",
    color: "#999999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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

var dot = {
    fontSize: "0.5em"
}

export default ShowPlaylist;