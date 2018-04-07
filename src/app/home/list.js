import React from "react";
import Track from "./track";
import ShowPlaylist from "../playlists/showplaylist";
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            context_name: null,
            context_uri: null
        }
        this.context = null;
        if (props.Squadify.queue.tracks != null && props.Squadify.queue.tracks.some(e => {if(e.context !== "Queued") {this.context = e.context; return true;}else return false;})) {
            props.Squadify.getPlaylist(this.context.split(":")[2], this.context.split(":")[4], (playlist) => {
                this.setState({
                    context_name: playlist.name,
                    context_uri: playlist.uri
                });
            })
        }
        this.goToContext = () => {
            props.pages.addPage(
                <ShowPlaylist owner_id={this.state.context_uri.split(":")[2]} id={this.state.context_uri.split(":")[4]} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            )
        }
        this.List = SortableContainer(() => {
            return (
                <div style={wrapper}>
                    <h5 className="ui header" style={upNext}>
                        Up next:
                    </h5>
                    <h5 className="ui header" style={context} onClick={this.goToContext.bind()}>
                        {this.state.context_name}
                    </h5>
                    <div className="ui grid" style={grid} id="queue">
                        {this.props.Squadify.queue.tracks.slice(0, 20).map((track, index) => {
                            return <Track Squadify={props.Squadify} socket={props.socket} key={track.id} index={index} track={track} />
                        })}
                    </div>
                </div>
            )
        });
        this.onSortEnd = ({ oldIndex, newIndex }) => {
            this.props.Squadify.setTracks(arrayMove(props.Squadify.queue.tracks, oldIndex, newIndex));
            props.socket.emit("track move", props.Squadify, oldIndex, newIndex);
        }
        this.props.socket.on("context updated", (context_uri, context_name) => {
            this.setState({ context_name: context_name, context_uri: context_uri })
        });
    }
    componentWillReceiveProps(props) {
        if (props.Squadify.queue.tracks != null) {
            if (!props.Squadify.queue.tracks.some(e => e.context !== "Queued")) {
                this.setState({ context_name: null, context_uri: null });
            }
        }
    }
    render() {
        if (this.props.Squadify.queue.tracks != null) {
            return <this.List onSortEnd={this.onSortEnd} useDragHandle={true} lockAxis={"y"} />
        } else {
            return null;
        }
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
    width: "100%"
}

var upNext = {
    color: "white",
    padding: "0 0 0 0",
    margin: "20px 0 0 10%",
}

var context = {
    color: "orange",
    padding: "0 0 0 0",
    margin: "-20px 10% 0 0",
    float: "right"
}

var grid = {
    width: "calc(100% + 10px)",
    maxWidth: "1000px",
    margin: "0 auto"
}

export default List;