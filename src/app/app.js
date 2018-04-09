import React from "react";
import openSocket from 'socket.io-client';
import Server from '../controllers/server';
import Header from "./header/header";
import Home from "./home/home";
import Browse from "./browse/browse";
import Search from "./search/search";
import Users from "./users/users";
import Library from "./library/library";
import Footer from "./footer/footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        var socket = openSocket(Server.url);
        this.state = {
            Socket: socket,
            page: 0
        }
        // INIT SOCKET CONNECTION
        socket.emit("join", props.Squadify);
        // GET INIT QUEUE INFO
        socket.on("joined", (info) => {
            console.log("welcome!");
            //console.log("SOCKET INIT:");
            props.Squadify.setInfo(info);
        });
        socket.on("status updated", (status) => {
            //console.log("STATUS UPDATE:");
            props.Squadify.setStatus(status);
        });
        socket.on("users updated", (users) => {
            //console.log("USER UPDATE:");
            //console.dir(users);
            if (!props.Squadify.isHost()) {
                if (!users.some(user => user.id === props.Squadify.user.id)) {
                    alert("You've been kicked!");
                    props.router.queues();
                }
            }
            props.Squadify.setUsers(users);
        });
        socket.on("tracks updated", (tracks) => {
            //console.log("TRACKS UPDATE:");
            props.Squadify.setTracks(tracks);
        });
        socket.on("player updated", (player) => {
            //console.log("PLAYER UPDATE:");
            props.Squadify.setPlayer(player);
        });
        socket.on("reconnect", () => {
            socket.emit("join", props.Squadify);
        });
        this.pages = {
            getPage: () => {
                return this.state.page
            },
            setPage: (page) => {
                this.setState({ page: page });
            }
        }

    }
    render() {
        return (
            <div>
                <div style={{ alignContent: "center", width: "100%", margin: "auto" }}>
                    <Header Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} router={this.props.router} />
                        <Home Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} />
                        <Browse Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} />
                        <Search Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} />
                        <Users Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} />
                        <Library Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} />
                    <Footer Squadify={this.props.Squadify} socket={this.state.Socket} pages={this.pages} />
                </div>
            </div>
        );
    }
}

export default App;