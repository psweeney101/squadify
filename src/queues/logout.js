import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.open = () => {
            this.setState({ open: true });
        }
        this.close = () => {
            this.setState({ open: false });
        }
        this.logout = () => {
            window.location.href = "/logout";
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.open} className="huge ui fluid red button">Logout</button>
                <Modal size={"mini"} open={this.state.open} onClose={this.close} closeIcon={true}>
                    <Modal.Header>
                        Logout
                    </Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to logout?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.logout.bind()} content="Logout" />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Logout;