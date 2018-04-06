import React from 'react';
import Handle from "./handle";
import { SortableElement } from 'react-sortable-hoc';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: null
        }
        this.removeTrack = () => {
            props.socket.emit("track remove", props.Squadify, props.track.id);
        }
        props.Squadify.getTrack(props.track.id, (track) => {
            props.Squadify.getProfile(props.track.added_by.id, (profile) => {
                this.setState({
                    track: SortableElement(({ index }) =>
                        <div className="row" style={row}>
                            <div className="three wide column" style={column} onClick={this.removeTrack.bind()}>
                                <i className="large icon minus circle"></i>
                            </div>
                            <div className="ten wide column" style={column}>
                                <div style={song}>
                                    <span style={name}>{track.name}</span><br />
                                    <span style={artist}>{track.artists[0].name}&nbsp;<span style={dot}>●</span>&nbsp;{profile.display_name != null ? profile.display_name : profile.id}</span>
                                </div>
                            </div>
                            <div className="three wide column" style={column}>
                                <Handle />
                            </div>
                        </div>
                    )
                });
            })
        })
    }
    render() {
        if (this.state.track != null) {
            return <this.state.track index={this.props.index}/>
        } else {
            return null;
        }
    }
}


var row = {
    padding: "5px 0 5px 0",
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

var song = {
    margin: "auto",
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var name = {
    fontSize: "1.0em",
    color: "white"
}

var artist = {
    fontSize: ".8em",
    color: "#BBBBBB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var dot = {
    fontSize: "0.5em",
    color: "white",
}

export default Track;