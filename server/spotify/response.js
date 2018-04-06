function handleResponse(error, response, body, statuses, refresh_token, cb, newTokenCb) {
    if(response != null && statuses.includes(response.statusCode)) {
        return cb({error: false, body: body});
    } else {
        if(body != null) {
            return cb({error: true, why: body});
        } else {
            return cb({error: true, why: error});
        }
    }
}

module.exports = handleResponse;