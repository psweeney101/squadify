import React from 'react';
import { Modal } from 'semantic-ui-react';
import server from "../controllers/server";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: "",
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
                name: e.target.value
            })
        }
        this.create = () => {
            this.setState({ disabled: true });
            server.createQueue(props.Squadify, this.state.name, (response) => {
                if (response.id != null) {
                    window.location.href = "/queue/" + response.id;
                }
            })
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.open} className="huge ui fluid grey button">Create Queue</button>
                <Modal size={'mini'} open={this.state.open} onClose={this.close} closeIcon={true}>
                    <Modal.Header>
                        Create A Queue
                </Modal.Header>
                    <Modal.Content>
                        <div className="ui form">
                            <div className="field">
                                <label>Queue Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <br />
                        <button disabled={this.state.disabled} className="ui button" onClick={this.create.bind()}>Submit</button>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Create;