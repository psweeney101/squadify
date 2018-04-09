import React from "react";
import Status from "./status";
import Navigation from "./navigation";
import Player from "./player.js";

class Footer extends React.Component {
    render() {
        this.top = null;
        this.percent = { 
            width: "100%",
            height: "5px",
            minWidth: "0%"
        };
        if(this.props.Squadify.queue.player != null) {
            this.percent.width = (this.props.Squadify.queue.player.progress_ms / this.props.Squadify.queue.player.item.duration_ms) * 100 + "%";
        } else {
            this.percent.width = "100%";
            this.percent.height = "1px";
        }
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
                <Navigation Squadify={this.props.Squadify} pages={this.props.pages} />
            </div>
        );
    }
}
//<Progress percent={this.props.player.progress} attached='top' style={progress} />

var progress = {
    width: "100%",
    height: ".1em"
}

var footer = {
    width: "100%",
    height: "100px",
    color: "white",
    position: "fixed",
    bottom: "0px",
    backgroundColor: "#282828",
    margin: "auto"
}

export default Footer;