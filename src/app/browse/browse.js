import React from 'react';
import IconAlbum from "../albums/iconalbum";
import IconPlaylist from "../playlists/iconplaylist";
import IconCategory from "../categories/iconcategory";
import ListTrack from "../tracks/listtrack";
import ListTracks from "../tracks/listtracks";

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            featuredPlaylistsMessage: "",
            topTracks: {
                items: []
            }
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
                featuredPlaylistsArray: response.playlists.items.map((playlist) => <IconPlaylist Squadify={props.Squadify} socket={props.socket} playlist={playlist} key={playlist.id} pages={this.pages} />)
            });
        });
        props.Squadify.getNewReleases(response => {
            this.setState({
                newReleasesArray: response.albums.items.map((album) => <IconAlbum Squadify={props.Squadify} socket={props.socket} album={album} key={album.id} pages={this.pages} />)
            });
        });
        props.Squadify.getCategories(response => {
            this.setState({
                categoriesArray: response.categories.items.map((category) => <IconCategory Squadify={props.Squadify} socket={props.socket} category={category} key={category.id} pages={this.pages} />)
            });
        });
        props.Squadify.getTopTracks((tracks) => {
            this.setState({
                topTracks: tracks
            });
        });
        this.allTopTracks = () => {
            this.pages.addPage(
                <ListTracks Squadify={props.Squadify} socket={props.socket} pages={this.pages} tracks={this.state.topTracks.items} title={"Top Tracks for You"} />
            )
        }
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
                        {this.state.topTracks.items.length === 0 ? null :
                            <div>
                                <br />
                                <h3 style={category}>Top Tracks for You</h3>
                                <div className="ui grid" style={list}>
                                    {this.state.topTracks.items.slice(0, 4).map((track) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} track={track} key={track.id} />)}
                                    <div className="row" onClick={this.allTopTracks.bind()}>
                                        <div className="fourteen wide column">
                                            See all top tracks
                                    </div>
                                        <div className="two wide column" style={column}>
                                            <i className="large ui angle right icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
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

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

var category = {
    margin: "0 auto",
    display: "table"
}

var grid = {
    overflowX: "scroll",
    margin: "0 0 0 0",
    width: "calc(100% + 10px)"
}

var list = {
    margin: "0 auto",
    width: "95%"
}

export default Browse;