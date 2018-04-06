import React from "react";
import Status from "./status";
import Navigation from "./navigation";
import Player from "./player.js";

class Footer extends React.Component {
    render() {
        this.top = null;
        this.percent = { 
            width: "50%",
            minWidth: "0%"
        };
        if(this.props.Squadify.queue.player != null) {
            this.percent.width = (this.props.Squadify.queue.player.progress_ms / this.props.Squadify.queue.player.item.duration_ms) * 100 + "%";
        }
        /*let percent = {
            width: this.props.player.progress + "%",
            minWidth: "0px"
        }*/
        if (this.props.Squadify.queue.status === "inactive") {
            this.top = <Status Squadify={this.props.Squadify} socket={this.props.socket} />;
        } else if(this.props.Squadify.queue.status === "active") {
            this.top = <Player Squadify={this.props.Squadify} />;
        }
        return (
            <div className="ui five column padded grid" style={footer}>
                <div className="ui top attached progress" style={progress}>
                    <div className="bar" style={this.percent} />
                </div>
                {this.top}
                <div className="ui divider" style={divider}></div>
                <Navigation Squadify={this.props.Squadify} />
            </div>
        );
    }
}
//<Progress percent={this.props.player.progress} attached='top' style={progress} />

var progress = {
    width: "100%"
}

var footer = {
    width: "100%",
    height: "100px",
    color: "white",
    position: "fixed",
    bottom: "0px",
    backgroundColor: "#282828",
}

var divider = {
    margin: "0 0 0 0 "
}

export default Footer;