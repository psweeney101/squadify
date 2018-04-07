import React from "react";
import ListTrack from "./listtrack.js";

class ListTracks extends React.Component {
    render() {
        return (
            <div style={wrapper}>
                <div className="ui grid" style={grid}>
                    <div className="row" style={row}>
                        <div className="two wide column">
                            <i className="large ui angle left icon" onClick={this.props.pages.removePage.bind()} />
                        </div>
                        <div className="twelve wide column" style={column}>
                            <h3>{this.props.title}</h3>
                        </div>
                    </div>
                    {this.props.tracks.map((track, index) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} pages={this.props.pages} track={track} key={index + ":" + track.id} />)}
                </div>
            </div>
        );
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

export default ListTracks;