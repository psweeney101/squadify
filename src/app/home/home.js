import React from "react";
import List from "./list";

class Home extends React.Component {
    render() {
        if (this.props.Squadify.queue.tracks != null) {
            return (
                <div style={{ display: (this.props.Squadify.page === 0 ? "block" : "none"), margin: "auto", maxWidth: "700px" }}>
                    <List Squadify={this.props.Squadify} socket={this.props.socket} />;
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Home;