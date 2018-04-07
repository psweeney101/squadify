import React from "react";
import Host from "./host";
import User from "./user";
import { Button, Modal } from "semantic-ui-react";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.open = () => {
            this.setState({ open: true });
        }
        this.close = () => {
            this.setState({ open: false });
        }
    }
    render() {
        if (this.props.Squadify.queue.users != null) {
            return (
                <div style={{ display: (this.props.Squadify.page === 3 ? "block" : "none"), margin: "auto", maxWidth: "700px" }} >
                    <div style={wrapper}>
                        <br />
                        <div style={buttonBox}>
                            <button onClick={this.open.bind()} style={button} className="ui blue button">Add User</button>
                        </div>
                        <h3 style={header} className="ui inverted header">
                            Host
                        </h3>
                        <div className="ui grid" style={grid}>
                            <Host Squadify={this.props.Squadify} socket={this.props.socket} />
                        </div>
                        <h3 style={header} className="ui inverted header">
                            Users
                        </h3>
                        <div className="ui grid" style={grid}>
                            {this.props.Squadify.queue.users.map((user) => { return <User Squadify={this.props.Squadify} socket={this.props.socket} user={user} key={user.id} /> })}
                        </div>
                    </div>
                    <Modal size={"large"} open={this.state.open} onClose={this.close} closeIcon={true}>
                        <Modal.Header>
                            Add User
                        </Modal.Header>
                        <Modal.Content>
                            <h4>Tell them the pin is <strong>{this.props.Squadify.queue.id}</strong></h4>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button positive onClick={this.close} icon="checkmark" labelPosition="right" content="Ok" />
                        </Modal.Actions>
                    </Modal>
                </div>
            );
        } else {
            return null;
        }
    }
}

var wrapper = {
    color: "white",
    overflowY: "scroll",
    position: "fixed",
    display: "block",
    maxHeight: "100%",
    top: "60px",
    bottom: "100px",
    width: "calc(100% + 10px)",
    maxWidth: "700px",
    overflowX: "hidden"
}
var buttonBox = {
    textAlign: "center",
    width: "calc(100% + 10px)",
}
var button = {
    width: "60%",
    maxWidth: "400px"
}

var header = {
    width: "calc(10px + 100%)",
    paddingTop: "15px",
    textAlign: "center"
}

var grid = {
    width: "calc(10px + 100%)",
    margin: "0 0 0 0",
    overflowX: "hidden"
}

export default Users;