import React from "react";
import Server from "../controllers/server";
import Spotify from "../controllers/spotify";
import { Modal } from "semantic-ui-react";

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            pin: "",
            disabled: false,
            queues: []
        }
        this.redirect = (id) => {
            window.location.href = "/queue/" + id;
        }
        this.open = () => {
            this.setState({ open: true });
        }
        this.close = () => {
            this.setState({ open: false });
        }
        this.handleChange = (e) => {
            this.setState({
                pin: e.target.value
            })
        }
        Server.getQueues(props.Squadify, (queues) => {
            queues.map((queue) => {
                Spotify.getProfile(props.Squadify, queue.host, (profile) => {
                    queue.host = profile.display_name;
                });
                return queue;
            });
            this.setState({
                queues: queues
            });
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.open} className="huge ui fluid white button">Current Queues</button>
                <Modal size={'mini'} open={this.state.open} onClose={this.close} closeIcon={true}>
                    <Modal.Header>
                        Current Queues
                    </Modal.Header>
                    <Modal.Content>
                        <div className="ui grid">
                            {this.state.queues.length !== 0 ? this.state.queues.map((queue) => {
                                return (
                                    <div className="row" style={row} key={queue.id} onClick={this.redirect.bind(null, queue.id)}>
                                        <div className="three wide column" style={column}>
                                            {queue.status === "active" ? <i class="green large circle icon"></i> : <i class="red large circle icon"></i> }
                                        </div>
                                        <div className="eleven wide column" style={col}>
                                            <span style={name}>{queue.name}</span><br />
                                            <span style={users}>HOST: {queue.host}</span>
                                            <span style={users}>CREATED ON: {new Date(queue.created_at).getMonth()}.{new Date(queue.created_at).getDate()}.{new Date(queue.created_at).getFullYear()}</span>
                                            <span style={users}>{queue.users.length + 1} USERS</span>
                                        </div>
                                        <div className="two wide column" style={column}>
                                            <i className="large ui angle right icon" />
                                        </div>
                                    </div>
                                );
                            }) : <div>You are not in any Queues! Join a Queue or create a Queue to get started.</div>}
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}


var row = {
    paddingBottom: "5px"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

var col = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var name = {
    fontSize: "1.0em",
    color: "black",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var users = {
    fontSize: ".8em",
    color: "#BBBBBB",
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

export default Join;