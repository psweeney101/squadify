import React from "react";
import List from "./list";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: []
        }
        this.pages = {
            addPage: (page) => {
                var old = this.state.pages;
                old.unshift(page);
                this.setState({ pages: old });
            },
            removePage: (page) => {
                var old = this.state.pages;
                old.shift(page);
                this.setState({ pages: old });
            }
        }
    }
    render() {
        if (this.props.Squadify.queue.tracks != null) {
            return (
                <div style={{ display: (this.props.Squadify.page === 0 ? "block" : "none"), margin: "auto", maxWidth: "700px" }} >
                    <div style={{ display: this.state.pages.length === 0 ? "block" : "none" }}>
                        <List Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} />;
                </div>
                    <div style={{ display: this.state.pages.length !== 0 ? "block" : "none" }} >
                        {this.state.pages[0]}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Home;