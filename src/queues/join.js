import React from 'react';
import { Modal } from 'semantic-ui-react';
import Server from "../controllers/server";

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            pin: "",
            disabled: false
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
            });
        }
        this.join = () => {
            Server.joinQueue(props.Squadify, this.state.pin, (queue) => {
                if(queue.error !== false && queue.id !== null) {
                    window.location.href = "/queue/" + queue.id
                }
            });
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.open} className="huge ui fluid green button">Join Queue</button>
                <Modal size={'mini'} open={this.state.open} onClose={this.close} closeIcon={true}>
                    <Modal.Header>
                        Join A Queue
                    </Modal.Header>
                    <Modal.Content>
                        <div className="ui form">
                            <div className="field">
                                <label>Queue Pin</label>
                                <input type="text" style={input} value={this.state.pin} onChange={this.handleChange} />
                            </div>
                        </div>
                        <br />
                        <button className="ui button" onClick={this.join.bind()}>Submit</button>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Join;

var input = {
    textTransform: "uppercase"
}