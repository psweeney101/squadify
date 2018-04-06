import React from "react";
import SearchResults from "./searchresults";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: []
        };
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
        return (
            <div style={{ display: (this.props.Squadify.page === 2 ? "block" : "none"), margin: "auto", maxWidth: "700px" }} >
                <div style={{ display: this.state.pages.length === 0 ? "block" : "none" }} >
                    <SearchResults Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} />
                </div>
                <div style={{ display: this.state.pages.length !== 0 ? "block" : "none" }} >
                    {this.state.pages[0]}
                </div>
            </div>
        );
    }
}

export default Search;