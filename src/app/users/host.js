import React from "react";
import noImage from "../../images/missingCoverArt.png";

class Host extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        };
        props.Squadify.getProfile(props.Squadify.queue.host, (profile) => {
            this.setState({ profile: profile });
        });
    }
    render() {
        if(this.state.profile != null) {
            return (
                <div className="eight wide column" style={column}>
                    <div style={wrapper}>
                    <img style={image} className="tiny ui circular image" src={this.state.profile.images[0] != null ? this.state.profile.images[0].url : noImage} alt="host" />
                    {this.state.profile.display_name != null ? this.state.profile.display_name : this.state.profile.id}
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