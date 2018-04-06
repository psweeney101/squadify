import React from 'react';
import logo from '../images/logo.png';
import Join from "./join";
import Current from "./current";
import Create from "./create";

class THIS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            join: {
                open: false,
                pin: "",
                disabled: false
            },
            current: {
                open: false
            },
            create: {
                open: false,
                name: "",
                disabled: false
            }
        }
        this.join = {
            open: () => {
                var join = this.state.join;
                join.open = true;
                this.setState({ join: join });
            },
            close: () => {
                var join = this.state.join;
                join.open = false;
                this.setState({ join: join });
            }
        }
        this.current = {
            open: () => {
                var current = this.state.current;
                current.open = true;
                this.setState({ current: current });
            },
            close: () => {
                var current = this.state.current;
                current.open = false;
                this.setState({ current: current });
            }
        }
        this.openJoin = () => this.setState({ join: true });
        this.openCurrent = () => this.setState({ current: true });
        this.openCreate = () => this.setState({ create: true });
        this.close = () => this.setState({
            join: false,
            current: false,
            create: false
        });
    }
    handleCreateChange = (e) => {
        this.setState({
            createName: e.target.value
        })
    }
    render() {
        return (
            <div style={wrapper}>
                <img style={img} className="ui small image" src={logo} alt="logo" />
                <br />
                <br />
                <div style={buttonBox}>
                    <div style={inner}>
                        <Join Squadify={this.props.Squadify} />
                        <br />
                        <Current Squadify={this.props.Squadify} />
                        <br />
                        <Create Squadify={this.props.Squadify} />
                    </div>
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
    top: "60px",
    bottom: "0px",
    width: "100%"
}

var img = {
    display: "block",
    margin: "auto"
}

var buttonBox = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "white",
    position: "fixed",
    top: "50%",
    width: "100%",
    textAlign: "center"
}

var inner = {
    width: "60%",
    maxWidth: "300px",
    margin: "0 auto"
}

export default THIS;