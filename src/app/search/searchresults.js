import React from "react";
import ListTrack from "../tracks/listtrack";
import ListTracks from "../tracks/listtracks";
import ListAlbum from "../albums/listalbum";
import ListAlbums from "../albums/listalbums";
import ListPlaylist from "../playlists/listplaylist";
import ListPlaylists from "../playlists/listplaylists";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.timeout = null;
        this.state = {
            value: sessionStorage.getItem("searchQuery") || "",
            showResults: false,
            tracks: {
                items: []
            },
            albums: {
                items: []
            },
            playlists: {
                items: []
            }
        };
        this.handleChange = (event) => {
            this.setState({ value: event.target.value });
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.doSearch, 500);
        }
        this.doSearch = () => {
            sessionStorage.setItem("searchQuery", this.state.value);
            if (this.state.value === "") {
                this.setState({
                    showResults: false
                });
            }
            else {
                props.Squadify.search(this.state.value, (response) => {
                    this.setState({
                        showResults: true,
                        tracks: response.tracks,
                        albums: response.albums,
                        playlists: response.playlists
                    });
                });
            }
        }
        this.allTracks = () => {
            this.props.pages.addPage(
                <ListTracks Squadify={props.Squadify} socket={props.socket} pages={props.pages} tracks={this.state.tracks.items} title={"Tracks"} />
            );
        }
        this.allAlbums = () => {
            this.props.pages.addPage(
                <ListAlbums Squadify={props.Squadify} socket={props.socket} pages={props.pages} albums={this.state.albums.items} title={"Albums"} />
            )
        }
        this.allPlaylists = () => {
            this.props.pages.addPage(
                <ListPlaylists Squadify={props.Squadify} socket={props.socket} pages={props.pages} playlists={this.state.playlists.items} title={"Playlists"} />
            )
        }
        if (this.state.value !== "") {
            this.doSearch();
        }
    }
    render() {
        return (
            <div style={wrapper}>
                <br />
                <div style={searchDiv}>
                    <div className="ui icon input">
                        <input type="text" placeholder="Search..." value={this.state.value} onChange={this.handleChange} />
                        <i className="search icon"></i>
                    </div>
                </div>
                <div style={{ display: (this.state.showResults ? "block" : "none") }}>
                    <br />
                    <br />
                    {this.state.tracks.items.length === 0 && this.state.albums.items.length === 0 && this.state.playlists.items.length === 0 ? <div><br /><h3 style={category}>No Results</h3></div> :
                        <div>
                            {this.state.tracks.items.length === 0 ? null :
                                <div>
                                    <br />
                                    <h3 style={category}>Tracks</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.tracks.items.slice(0, 4).map((track) => <ListTrack Squadify={this.props.Squadify} socket={this.props.socket} track={track} key={track.id} />)}
                                        <div className="row">
                                            <div className="fourteen wide column" onClick={this.allTracks.bind()}>
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
                                    <h3 style={category}>Albums</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.albums.items.slice(0, 4).map((album) => <ListAlbum Squadify={this.props.Squadify} socket={this.props.socket} pages={this.props.pages} album={album} key={album.id} />)}
                                        <div className="row">
                                            <div className="fourteen wide column" onClick={this.allAlbums.bind()}>
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
                                    <h3 style={category}>Playlists</h3>
                                    <div className="ui grid" style={grid}>
                                        {this.state.playlists.items.slice(0, 4).map((playlist) => <ListPlaylist Squadify={this.props.Squadify} socket={this.props.socket} pages={this.props.pages} playlist={playlist} key={playlist.id} />)}
                                        <div className="row">
                                            <div className="fourteen wide column" onClick={this.allPlaylists.bind()}>
                                                See all playlists
                                        </div>
                                            <div className="two wide column" style={column}>
                                                <i className="large ui angle right icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
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

var searchDiv = {
    display: "flex",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
};

export default SearchResults;