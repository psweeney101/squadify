import React from 'react';
import Handle from "./handle";
import { SortableElement } from 'react-sortable-hoc';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.track = SortableElement(({ index }) =>
            <div className="row" style={row}>
                <div className="three wide column" style={column} onClick={this.removeTrack.bind()}>
                    <i className="large icon minus circle"></i>
                </div>
                <div className="ten wide column" style={column}>
                    <div style={song}>
                        <span style={props.track.context === "Queued" ? name : contextName}>{props.track.name}</span><br />
                        <span style={artist}>{props.track.artist}&nbsp;<span style={dot}>●</span>&nbsp;{props.track.added_by.display_name != null ? props.track.added_by.display_name : props.track.added_by.id}</span>
                    </div>
                </div>
                <div className="three wide column" style={column}>
                    <Handle />
                </div>
            </div>
        )
        this.removeTrack = () => {
            props.socket.emit("track remove", props.Squadify, props.track.id);
        }
    }
    render() {
        if (this.track != null) {
            return <this.track index={this.props.index} />
        } else {
            return null;
        }
    }
}


var row = {
    padding: "5px 0 5px 0",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    height: "45px"
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

var contextName = {
    fontSize: "1.0em",
    color: "orange"
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