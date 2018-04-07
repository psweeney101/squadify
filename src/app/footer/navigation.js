import React from 'react';

class Navigation extends React.Component {
    render() {
        return (
            <div className="row" style={row}>
                <div className="column" style={column} onClick={this.props.Squadify.setPage.bind(null, 0)}>
                    <div style={content}>
                        <i className="big home icon" style={this.props.Squadify.page === 0 ? iconOn : iconOff}></i>
                        <br />
                        <div style={this.props.Squadify.page === 0 ? nameOn : nameOff}>Home</div>
                    </div>
                </div>
                <div className="column" style={column} onClick={this.props.Squadify.setPage.bind(null, 1)}>
                    <div style={content}>
                        <i className="big music icon"  style={this.props.Squadify.page === 1 ? iconOn : iconOff}></i>
                        <br />
                        <div style={this.props.Squadify.page === 1 ? nameOn : nameOff}>Browse</div>
                    </div>
                </div>
                <div className="column" style={column} onClick={this.props.Squadify.setPage.bind(null, 2)}>
                    <div style={content}>
                        <i className="big search icon"  style={this.props.Squadify.page === 2 ? iconOn : iconOff}></i>
                        <br />
                        <div style={this.props.Squadify.page === 2 ? nameOn : nameOff}>Search</div>
                    </div>
                </div>
                <div className="column" style={column} onClick={this.props.Squadify.setPage.bind(null, 3)}>
                    <div style={content}>
                        <i className="big users icon"  style={this.props.Squadify.page === 3 ? iconOn : iconOff}></i>
                        <br />
                        <div style={this.props.Squadify.page === 3 ? nameOn : nameOff}>Users</div>
                    </div>
                </div>
                <div className="column" style={column} onClick={this.props.Squadify.setPage.bind(null, 4)}>
                    <div style={content}>
                        <i className="big book icon"  style={this.props.Squadify.page === 4 ? iconOn : iconOff}></i>
                        <br />
                        <div style={this.props.Squadify.page === 4 ? nameOn : nameOff}>Library</div>
                    </div>
                </div>
            </div>
        );
    }
}

var row = {
    padding: "0 0 0 0",
    height: "60px",
    margin: "auto",
    maxWidth: "700px",
}

var column = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

var nameOff = {
    margin: "0 auto",
    color: "grey"
}

var iconOff = {
    margin: "0 auto",
    color: "grey"
}

var nameOn = {
    margin: "0 auto",
    color: "white"
}

var iconOn = {
    margin: "0 auto",
    color: "white"
}

var content = {
    textAlign: "center"
}

export default Navigation;