import React from "react";
import Track from "./track";
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.List = SortableContainer(() => {
            return (
                <div style={wrapper}>
                    <h5 className="ui header" style={upNext}>
                        Up next:
                                </h5>
                    <div className="ui grid" style={grid} id="queue">
                        {this.props.Squadify.queue.tracks.map((track, index) => {
                            return <Track Squadify={props.Squadify} socket={props.socket} key={track.id} index={index} track={track} />
                        })}
                    </div>
                </div>
            )
        });
        this.onSortEnd = ({oldIndex, newIndex}) => {
            this.props.Squadify.setTracks(arrayMove(props.Squadify.queue.tracks, oldIndex, newIndex));
            props.socket.emit("track move", props.Squadify, oldIndex, newIndex);
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

var grid = {
    width: "calc(100% + 10px)",
    maxWidth: "1000px",
    margin: "0 auto"
}

export default List;