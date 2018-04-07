import React from "react";
import noImage from "../../images/missingCoverArt.png";

class Host extends React.Component {
    render() {
        if(this.props.Squadify.queue != null && this.props.Squadify.queue.host != null) {
            return (
                <div className="eight wide column" style={column}>
                    <div style={wrapper}>
                    <img style={image} className="tiny ui circular image" src={this.props.Squadify.queue.host.avatar_url != null ? this.props.Squadify.queue.host.avatar_url : noImage} alt="host" />
                    {this.props.Squadify.queue.host.display_name != null ? this.props.Squadify.queue.host.display_name : this.props.Squadify.queue.host.id}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

var wrapper = {
    margin: "0 auto",
    display: "table",
    textAlign: "center",
}

var column = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
}

var image = {
    margin: "0 auto",
}

export default Host;