import axios from "axios";
const url = /*"http://10.0.0.252:4200";*/"https://squadify.herokuapp.com";

var server = {
    url: url,
    checkIn: function(cb) {
        axios.get(url + "/api/router"
        ).then(function (response) {
            //console.log("CHECK TOKENS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    tryQueue: function(Squadify, id, cb) {
        axios.get(url + "/api/router/queue/" + id, {
            params: {
                user_id: Squadify.user.id,
                server_token: Squadify.user.server_token
            }
        }).then(function (response) {
            //console.log("CHECK TOKENS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    checkTokens: function (user_id, access_token, refresh_token, server_token, cb) {
        axios.get(url + "/api/tokens/check", {
            params: {
                user_id: user_id,
                access_token: access_token,
                refresh_token: refresh_token,
                server_token: server_token
            }
        }).then(function (response) {
            //console.log("CHECK TOKENS:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    checkQueue: function (user_id, queue_id, server_token, cb) {
        axios.get(url + "/api/user/queue/" + queue_id + "/check", {
            params: {
                user_id: user_id,
                server_token: server_token
            }
        }).then(function (response) {
            //console.log("CHECK QUEUE:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    joinQueue: function (Squadify, queue_id, cb) {
        axios.post(url + "/api/queue/" + queue_id + "/join", {
            user_id: Squadify.user.id,
            server_token: Squadify.user.server_token
        }).then(function (response) {
            //console.log("JOIN QUEUE:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    getDevices: function (Squadify, cb) {
        axios.get(url + "/api/queue/" + Squadify.queue.id + "/devices", {
            params: {
                user_id: Squadify.user.id,
                server_token: Squadify.user.server_token
            }
        }).then(function (response) {
            //console.log("GET DEVICES:");
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    getQueues: function (Squadify, cb) {
        axios.get(url + '/api/user/queues', {
            params: {
                user_id: Squadify.user.id,
                server_token: Squadify.user.server_token
            }
        }).then(function (response) {
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    },
    createQueue: function (Squadify, name, cb) {
        axios.post(url + '/api/queue', {
            user_id: Squadify.user.id,
            server_token: Squadify.user.server_token,
            name: name
        }).then(function (response) {
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.log("CREATE QUEUE:");
            //console.dir(error);
        });
    },
    refreshToken: function (refresh_token, cb) {
        axios.post(url + '/api/tokens/refresh', {
            refresh_token: refresh_token
        }).then(function (response) {
            //console.dir(response);
            return cb(response.data);
        }).catch(function (error) {
            //console.dir(error);
        });
    }
}

export default server;