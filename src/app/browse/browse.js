import React from 'react';
import IconAlbum from "../albums/iconalbum";
import IconPlaylist from "../playlists/iconplaylist";
import IconCategory from "../categories/iconcategory";

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            featuredPlaylistsMessage: ""
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
        props.Squadify.getFeaturedPlaylists(response => {
            this.setState({
                featuredPlaylistsMessage: response.message,
                featuredPlaylistsArray: response.playlists.items.map((playlist) => <IconPlaylist Squadify={props.Squadify} socket={props.socket} owner_id={playlist.owner.id} id={playlist.id} key={playlist.id} pages={this.pages} />)
            })
        });
        props.Squadify.getNewReleases(response => {
            this.setState({
                newReleasesArray: response.albums.items.map((album) => <IconAlbum Squadify={props.Squadify} socket={props.socket} id={album.id} key={album.id} pages={this.pages} />)
            })
        });
        props.Squadify.getCategories(response => {
            this.setState({
                categoriesArray: response.categories.items.map((category) => <IconCategory Squadify={props.Squadify} socket={props.socket} category={category} key={category.id} pages={this.pages} />)
            })
        })
    }
    render() {
        return (
            <div style={{ display: (this.props.Squadify.page === 1 ? "block" : "none"), margin: "auto", maxWidth: "700px" }} >
                <div style={{ display: this.state.pages.length === 0 ? "block" : "none" }} >
                    <div style={wrapper}>
                        <h3 style={header} className="ui inverted header">
                            {this.state.featuredPlaylistsMessage}
                        </h3>
                        <div style={grid}>
                            {this.state.featuredPlaylistsArray}
                        </div>
                        <h3 style={header} className="ui inverted header">
                            New Releases
                        </h3>
                        <div style={grid}>
                            {this.state.newReleasesArray}
                        </div>
                        <h3 style={header} className="ui inverted header">
                            Categories
                        </h3>
                        <div className="ui grid" style={grid}>
                            {this.state.categoriesArray}
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.pages.length !== 0 ? "block" : "none" }} >
                    {this.state.pages[0]}
                </div>
            </div>
        );
    }
}

var wrapper = {
    color: "white",
    overflowY: "scroll",
    overflowX: "hidden",
    position: "fixed",
    display: "block",
    maxHeight: "100%",
    maxWidth: "700px",
    top: "60px",
    bottom: "100px",
    width: "100%",
    whiteSpace: "nowrap"
}

var header = {
    width: "calc(10px + 100%)",
    paddingTop: "15px",
    textAlign: "center"
}

var grid = {
    overflowX: "scroll",
    margin: "0 0 0 0",
    width: "calc(100% + 10px)"
}

export default Browse;