import ReactDOM from "react-dom";
import React from "react";
import Cookies from "universal-cookie";
import Squadify from "./controllers/squadify";
import Login from "./login/login";
import Queues from "./queues/queues";
import App from "./app/app";
import server from "./controllers/server";
const cookies = new Cookies();

// ROUTER
if (window.location.pathname === "/") {
    // LOGIN OR GO TO QUEUE IN COOKIE
    checkCookie((check) => {
        if (check == null) {
            ReactDOM.render(<Login />, document.getElementById("root"));
        } else {
            if (check.queue.id != null) {
                window.location.href = "/queue/" + check.queue.id;
            } else {
                window.location.href = "/queues";
            }
        }
    });
} else if (window.location.pathname.match("^[/]logout[/]?$")) {
    // LOGOUT
    cookies.remove("Squadify");
    window.location.href = "/";
} else if (window.location.pathname.match("^[/]queue[/][a-zA-Z0-9_.-]*[/]?")) {
    // DEFINED QUEUE
    checkCookie((check) => {
        if (check == null) {
            window.location.href = "/logout";
        } else {
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
            ReactDOM.render(<Queues Squadify={check} />, document.getElementById("root"));
        }
    });
} else {
    window.location.href = "/";
}

// CHECK TOKENS VIA SERVER
function checkCookie(cb) {
    var cookie = cookies.get("Squadify");
    console.dir(cookie);
    if (cookie === undefined || cookie == null) {
        return cb(null);
    } else {
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
}