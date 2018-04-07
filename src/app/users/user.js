import React from "react";
import noImage from "../../images/missingCoverArt.png";
import { Button, Modal } from "semantic-ui-react";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.open = () => {
            if(props.Squadify.isHost()) {
                this.setState({ open: true });
            }
            
        }
        this.close = () => {
            if(props.Squadify.isHost()) {
                this.setState({ open: false });
            }
        }
        this.kick = () => {
            if(props.Squadify.isHost()) {
                props.socket.emit("kick user", props.Squadify, props.user.id);
            }
        }
    }

    render() {
        if (this.state.profile != null) {
            return (
                <div className="eight wide column" style={column} onClick={this.open.bind()}>
                    <div style={wrapper}>
                        <img style={image} className="tiny ui circular image" src={this.state.profile.images[0] != null ? this.state.profile.images[0].url : noImage} alt="user" />
                        {this.state.profile.display_name != null ? this.state.profile.display_name : this.state.profile.id}
                    </div>
                    <Modal size={"mini"} open={this.state.open} onClose={this.close} closeIcon={true}>
                        <Modal.Header>
                            Remove {this.state.profile.display_name != null ? this.state.profile.display_name : this.state.profile.id} from {this.props.Squadify.queue.name}
                        </Modal.Header>
                        <Modal.Content>
                            <p>Are you sure you want to remove {this.state.profile.display_name != null ? this.state.profile.display_name : this.state.profile.id} from {this.props.Squadify.queue.name}?</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={this.close}>
                                No
                            </Button>
                            <Button onClick={this.kick.bind()} positive icon='checkmark' labelPosition='right' content='Yes' />
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
    margin: "0 auto",
    display: "table",
    textAlign: "center",
}

var column = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
}

var image = {
    margin: "0 auto",
}

export default User;