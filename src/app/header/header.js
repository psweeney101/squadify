import React from 'react';
import logo from '../../images/logo.png'
import spotifyLogo from "../../images/spotify-logo.png";

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
            avatar: spotifyLogo
        }
        props.Squadify.getProfile(props.Squadify.user.id, (profile) => {
            if(profile.images[0] != null) {
                this.setState({
                    avatar: profile.images[0].url
                });
            }
        });
        this.goToQueues = () => {
            window.location.href = "/queues";
        }
    }
    render() {
        return (
            <div className="ui grid" style={wrapper}>
                <div className="row" style={row}>
                    <div className="four wide column">
                        <img style={logoStyle} onClick={this.goToQueues.bind()} src={logo} alt="logo"/>
                    </div>
                    <div className="eight wide column" style={column}>
                        <div style={content}>
                            <span style={title}>{pageNames[this.props.Squadify.page]}</span>
                            <br />
                            <span style={name}>{this.props.Squadify.queue.name}</span>
                        </div>
                    </div>
                    <div className="four wide column">
                        <img className="mini ui circular image" style={logoStyle} src={this.state.avatar} alt="playlist"/>
                    </div>
                </div>
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
    margin: "0 0 0 0"
}

var row = {
    padding: "0 0 0 0",
    height: "100%"
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