import Cookies from "universal-cookie";
import Server from "./server";

const cookies = new Cookies();

class User {
    constructor(user_id, access_token, refresh_token, server_token) {
        this.id = user_id;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.server_token = server_token;
    }
    // GETTERS
    getNewAccessToken(cb) {
        Server.refreshToken(this.refresh_token, (tokens) => {
            this.access_token = tokens.access_token;
            this.refresh_token = tokens.refresh_token;
            var cookie = cookies.get("Squadify");
            cookie.access_token = tokens.access_token;
            cookie.refresh_token = tokens.refresh_token;
            cookies.set("Squadify", tokens.access_token, { path: "/" });
            return cb(tokens);
        });
    }

    // SETTERS
}

export default User;