import ReactDOM from "react-dom";
import React from "react";
import Squadify from "./controllers/squadify";
import Login from "./login/login";
import Queues from "./queues/queues";
import App from "./app/app";
import Server from "./controllers/server";

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Squadify: ""
        }
        this.handleResponse = (response) => {
            if (response.Squadify != null) {
                var squadify = new Squadify(response.Squadify);
                squadify.setState = (newSquadify) => {
                    this.setState({ Squadify: newSquadify });
                };
                console.dir(squadify);
                this.setState({ Squadify: squadify });
            } else {
                this.setState({ Squadify: null });
            }
        }
        Server.checkIn((response) => {
            this.handleResponse(response);
        });
        this.router = {
            app: (id) => {
                Server.tryQueue(this.state.Squadify, id, (response) => {
                    this.handleResponse(response);
                });
            },
            queues: () => {
                var newSquadify = this.state.Squadify;
                this.state.Squadify.queue = null;
                this.setState({Squadify: newSquadify});
            }
        }
    }

    render() {
        if (this.state.Squadify === "") {
            return null;
        } else if (this.state.Squadify == null) {
            return <Login />;
        } else if (this.state.Squadify.user != null && this.state.Squadify.queue == null) {
            return <Queues Squadify={this.state.Squadify} router={this.router} />;
        } else {
            return <App Squadify={this.state.Squadify} router={this.router} />;
        }
    }
}

ReactDOM.render(<Router />, document.getElementById("root"));

// ROUTER
/*if (window.location.pathname === "/") {
    // LOGIN OR GO TO QUEUE IN COOKIE
    checkCookie((check) => {
        if (check == null) {
            ReactDOM.render(<Login />, document.getElementById("root"));
        } else {
            //console.dir(JSON.stringify(check));
            if (check.queue.id != null) {
                window.location.href = "/queue/" + check.queue.id;
            } else {
                window.location.href = "/queues";
            }
        }
    });
} else if (window.location.pathname.match("^[/]logout[/]?$")) {
    // LOGOUT
    cookies.remove("io");
    cookies.remove("Squadify");
    //console.log(JSON.stringify(cookies.getAll()));
    window.location.href = "/"
} else if (window.location.pathname.match("^[/]queue[/][a-zA-Z0-9_.-]*[/]?")) {
    // DEFINED QUEUE
    checkCookie((check) => {
        if (check == null) {
            window.location.href = "/logout";
        } else {
            //console.dir(JSON.stringify(check));
            server.checkQueue(check.user.id, window.location.pathname.split("/")[2], check.user.server_token, (response) => {
                if (response.good) {
                    setCookieQueueId(window.location.pathname.split("/")[2]);
                    check.queue.id = window.location.pathname.split("/")[2];
                    ReactDOM.render(<App Squadify={check} />, document.getElementById("root"));
                } else {
                    window.location.href = "/queues";
                }
            });
        }
    });
} else if (window.location.pathname.match("^[/]queues[/]?$")) {
    // DEFINED QUEUE
    checkCookie((check) => {
        if (check == null) {
            window.location.href = "/logout";
        } else {
            //console.dir(JSON.stringify(check));
            ReactDOM.render(<Queues Squadify={check} />, document.getElementById("root"));
        }
    });
} else {
    window.location.href = "/";
}

// CHECK TOKENS VIA SERVER
function checkCookie(cb) {
    var cookie = cookies.get("Squadify");
    if (cookie === undefined || cookie == null) {
        return cb(null);
    } else {
        //console.dir(JSON.stringify(cookie));
        server.checkTokens(cookie.user_id, cookie.access_token, cookie.refresh_token, cookie.server_token, (response) => {
            if (response.good) {
                return cb(new Squadify(cookie.user_id, cookie.queue_id, cookie.access_token, cookie.refresh_token, cookie.server_token));
            } else {
                return cb(null);
            }
        })
    }
}

function setCookieQueueId(id) {
    var cookie = cookies.get("Squadify");
    cookie.queue_id = id;
    cookies.set("Squadify", cookie, { path: "/" });
}*/