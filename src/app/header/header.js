import React from 'react';
import logo from '../../images/logo.png'
import spotifyLogo from "../../images/spotify-logo.png";
import Popup from "./popup";

var pageNames = {
    0: "Home",
    1: "Browse",
    2: "Search",
    3: "Users",
    4: "Library"
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false
        }
        this.popup = () => {
            this.setState({
                popup: !this.state.popup
            })
        }
    }
    render() {
        return (
            <div className="ui grid" style={wrapper}>
                <div className="row" style={row}>
                    <div className="four wide column">
                        <img style={logoStyle} onClick={this.props.router.queues.bind()} src={logo} alt="logo" />
                    </div>
                    <div className="eight wide column" style={column}>
                        <div style={content}>
                            <span style={title}>{pageNames[this.props.pages.getPage()]}</span>
                            <br />
                            <span style={name}>{this.props.Squadify.queue.name}</span>
                        </div>
                    </div>
                    <div className="four wide column" onClick={this.popup}>
                        <img className="mini ui circular image" style={logoStyle} src={this.props.Squadify.user.avatar_url != null ? this.props.Squadify.user.avatar_url : spotifyLogo} alt="playlist" />
                    </div>
                </div>
                <Popup Squadify={this.props.Squadify} socket={this.props.socket} />
            </div>
        );
    }
}

var wrapper = {
    width: "100%",
    height: "60px",
    backgroundColor: "#222222",
    position: "fixed",
    top: "0px",
    color: "white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: "auto"
}

var row = {
    padding: "0 0 0 0",
    height: "100%",
    width: "100%",
    maxWidth: "700px"
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

var content = {
    textAlign: "center"
}

var title = {
    fontSize: "1.5em"
}

var name = {
    fontSize: "0.75em"
}

var logoStyle = {
    maxHeight: "60px",
    width: "auto",
    margin: "0 auto",
    display: "block"
}

export default Header;