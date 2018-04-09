import React from "react";
import ListTrack from "../tracks/listtrack";
import ListTracks from "../tracks/listtracks";
import ListAlbum from "../albums/listalbum";
import ListAlbums from "../albums/listalbums";
import ListPlaylist from "../playlists/listplaylist";
import ListPlaylists from "../playlists/listplaylists";

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            tracks: {
                items: []
            },
            albums: {
                items: []
            },
            playlists: {
                items: []
            },
            recentlyPlayedTracks: {
                items: []
            }
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
        props.Squadify.getSavedTracks((tracks) => {
            this.setState({ tracks: tracks });
        });
        props.Squadify.getSavedAlbums((albums) => {
            this.setState({ albums: albums });
        });
        props.Squadify.getSavedPlaylists((playlists) => {
            this.setState({ playlists: playlists });
        });
        props.Squadify.getRecentlyPlayedTracks((recentlyPlayedTracks) => {
            this.setState({ recentlyPlayedTracks: recentlyPlayedTracks });
        });
        this.allTracks = () => {
            this.pages.addPage(
                <ListTracks Squadify={props.Squadify} socket={props.socket} pages={this.pages} tracks={this.state.tracks.items.map((item) => { return item.track })} title={"Your Tracks"} />
            );
        }
        this.allAlbums = () => {
            this.pages.addPage(
                <ListAlbums Squadify={props.Squadify} socket={props.socket} pages={this.pages} albums={this.state.albums.items.map((item) => { return item.album })} title={"Your Albums"} />
            )
        }
        this.allPlaylists = () => {
            this.pages.addPage(
                <ListPlaylists Squadify={props.Squadify} socket={props.socket} pages={this.pages} playlists={this.state.playlists.items} title={"Your Playlists"} />
            )
        }
        this.allRecentlyPlayedTracks = () => {
            this.pages.addPage(
                <ListTracks Squadify={props.Squadify} socket={props.socket} pages={this.pages} tracks={this.state.recentlyPlayedTracks.items.map((item) => { return item.track })} title={"Your Recently Played Tracks"} />
            )
        }

    }
    changePage = (newPage, newData) => {
        this.setState({ page: newPage });
        if (newData) {
            this.setState({ data: newData });
        }
    }

    render() {
        return (
            <div style={{ display: (this.props.pages.getPage() === 4 ? "block" : "none"), margin: "auto", maxWidth: "700px" }} >
                <div style={{ display: this.state.pages.length === 0 ? "block" : "none" }} >
                    <div style={wrapper}>
                        <br />
                        <div>
                            {this.state.tracks.items.length === 0 ? null :
                                <div>
                                    <h3 style={category}>Your Tracks</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.tracks.items.slice(0, 4).map((item) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} track={item.track} key={item.track.id} />)}
                                        <div className="row" onClick={this.allTracks.bind()}>
                                            <div className="fourteen wide column">
                                                See all tracks
                                    </div>
                                            <div className="two wide column" style={column}>
                                                <i className="large ui angle right icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.albums.items.length === 0 ? null :
                                <div>
                                    <br />
                                    <h3 style={category}>Your Albums</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.albums.items.slice(0, 4).map((item) => <ListAlbum Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} album={item.album} key={item.album.id} />)}
                                        <div className="row" onClick={this.allAlbums.bind()}>
                                            <div className="fourteen wide column">
                                                See all albums
                                    </div>
                                            <div className="two wide column" style={column}>
                                                <i className="large ui angle right icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.playlists.items.length === 0 ? null :
                                <div>
                                    <br />
                                    <h3 style={category}>Your Playlists</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.playlists.items.slice(0, 4).map((playlist) => <ListPlaylist Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} playlist={playlist} key={playlist.id} />)}
                                        <div className="row" onClick={this.allPlaylists.bind()}>
                                            <div className="fourteen wide column">
                                                See all playlists
                                    </div>
                                            <div className="two wide column" style={column}>
                                                <i className="large ui angle right icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.recentlyPlayedTracks.items.length === 0 ? null :
                                <div>
                                    <br />
                                    <h3 style={category}>Your Recently Played Tracks</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.recentlyPlayedTracks.items.slice(0, 4).map((item, index) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} pages={this.pages} track={item.track} key={index + ":" + item.track.id} />)}
                                        <div className="row" onClick={this.allRecentlyPlayedTracks.bind()}>
                                            <div className="fourteen wide column">
                                                See all recently played tracks
                                                </div>
                                            <div className="two wide column" style={column}>
                                                <i className="large ui angle right icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.pages.length !== 0 ? "block" : "none" }} >
                    {this.state.pages[0]}
                </div>
            </div >
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

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

var category = {
    margin: "0 auto",
    display: "table"
}

export default Library;