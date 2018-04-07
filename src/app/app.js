import React from "react";
import openSocket from 'socket.io-client';
import Server from '../controllers/server';
import Squadify from "../controllers/squadify";
import Header from "./header/header";
import Home from "./home/home";
import Browse from "./browse/browse";
import Search from "./search/search";
import Users from "./users/users";
import Library from "./library/library";
import Footer from "./footer/footer";

var socket = null;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.squadify = new Squadify(props.Squadify);
        this.squadify.setState = (newSquadify) => {
            this.setState({ Squadify: newSquadify });
            //console.dir(newSquadify);
        };
        socket = openSocket(Server.url);
        this.state = {
            Squadify: this.squadify,
            Socket: socket
        }
        // INIT SOCKET CONNECTION
        socket.emit("join", props.Squadify);
        // GET INIT QUEUE INFO
        socket.on("joined", (info) => {
            alert("welcome!");
            //console.log("SOCKET INIT:");
            this.state.Squadify.setInfo(info);
        });
        socket.on("status updated", (status) => {
            //console.log("STATUS UPDATE:");
            this.state.Squadify.setStatus(status);
        });
        socket.on("users updated", (users) => {
            //console.log("USER UPDATE:");
            //console.dir(users);
            if(!this.state.Squadify.isHost()) {
                if(!users.some(e => e === this.state.Squadify.user.id)) {
                    alert("You've been kicked!");
                    window.location.href = "/queues";
                }
            }
            this.state.Squadify.setUsers(users);
        });
        socket.on("tracks updated", (tracks) => {
            //console.log("TRACKS UPDATE:");
            this.state.Squadify.setTracks(tracks);
        });
        socket.on("player updated", (player) => {
            //console.log("PLAYER UPDATE:");
            this.state.Squadify.setPlayer(player);
        });
        window.addEventListener("focus", () => socket.connect());
    }
    render() {
        return (
            <div>
                <div style={{alignContent: "center", width: "100%", margin: "auto"}}>
                    <Header Squadify={this.state.Squadify} socket={this.state.Socket} />
                    <Home Squadify={this.state.Squadify} socket={this.state.Socket} />
                    <Browse Squadify={this.state.Squadify} socket={this.state.Socket} />
                    <Search Squadify={this.state.Squadify} socket={this.state.Socket} />
                    <Users Squadify={this.state.Squadify} socket={this.state.Socket} />
                    <Library Squadify={this.state.Squadify} socket={this.state.Socket} />
                    <Footer Squadify={this.state.Squadify} socket={this.state.Socket} />
                </div>
            </div>
        );
    }
}

export default App;