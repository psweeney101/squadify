import Cookies from "universal-cookie";
import Server from "./server";

const cookies = new Cookies();

class User {
    constructor(object) {
        if(object != null) {
            this.id = object.id;
            this.access_token = object.access_token;
            this.refresh_token = object.refresh_token;
            this.server_token = object.server_token;
            this.display_name = object.display_name;
            this.avatar_url = object.avatar_url;
        }     
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