import React from 'react';
import { Modal } from 'semantic-ui-react';
import Server from "../../controllers/server";

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            disabled: false
        }
        this.openModal = () => {
            Server.getDevices(props.Squadify, (response) => {
                this.setState({
                    modal: true,
                    devices: response.spotify.body.devices.map((device) => {
                        var icon = "";
                        switch (device.type.toLowerCase()) {
                            case "computer":
                                icon = "laptop";
                                break;
                            case "tablet":
                                icon = "tablet alternate";
                                break;
                            case "smartphone":
                                icon = "mobile alternate";
                                break;
                            case "speaker":
                                icon = "headphones";
                                break;
                            case "tv":
                                icon = "tv";
                                break;
                            default:
                                icon = "volume up";
                                break;
                        }
                        icon = "huge ui " + icon + " icon";
                        return (
                            <div className="row" key={device.id}>
                                <div className="three wide column" style={column}>
                                    <i className={icon} />
                                </div>
                                <div className="ten wide column" style={column}>
                                    <div style={deviceInfo} onClick={this.startQueue.bind(null, device.id)}>
                                        <span style={name}>{device.name}</span><br />
                                        <span style={type}>Type: {device.type}</span>
                                    </div>
                                </div>
                                <div className="three wide column" style={column}>
                                    <i className="large ui angle right icon" />
                                </div>
                            </div>
                        )
                    }
                    )
                });
            });
        }
        this.closeModal = () => {
            this.setState({ modal: false });
        };
        this.startQueue = (device_id) => {
            if (!this.state.disabled) {
               /* this.setState({
                    disabled: true
                });*/
                this.props.socket.emit('start', this.props.Squadify, device_id);
                /*this.props.Socket.on('status update', () => {
                    this.setState({ disabled: false });
                    this.closeModal();
                });*/
            }
        }
    }
    render() {
        let body = <span style={type}>This Queue is currently inactive. Only the host can begin the Queue.</span>
        if (this.props.Squadify.queue.host.id === this.props.Squadify.user.id && this.props.Squadify.queue.tracks != null && this.props.Squadify.queue.tracks.length > 0) {
            body = <button onClick={this.openModal} className="ui inverted green basic button">Begin Queue</button>
        } else if(this.props.Squadify.queue.host.id === this.props.Squadify.user.id && (this.props.Squadify.queue.tracks == null || this.props.Squadify.queue.tracks.length === 0)) {
            body =  <span style={type}>The Queue is empty! Add some tracks before you start.</span>
        }
        return (
            <div className="row" style={wrapper}>
                <div className="sixteen wide column" style={column}>
                    {body}
                </div>
                <Modal size={'mini'} open={this.state.modal} onClose={this.closeModal} closeIcon={true}>
                    <Modal.Header>
                        Pick an Active Device
                    </Modal.Header>
                    <Modal.Content>
                        <div className="ui grid">
                            {this.state.devices}
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

var wrapper = {
    height: "40px",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "#888"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

var deviceInfo = {
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var name = {
    fontSize: "0.9em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var type = {
    fontSize: "0.7em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "0 0 0 0"
}

export default Status;