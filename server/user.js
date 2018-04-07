var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    // ID OF THE USER ON SPOTIFY
    id: {
        type: String,
        required: true,
        unique: true
    },
    // DISPLAY_NAME OF THE USER ON SPOTIFY
    display_name: {
        type: String
    },
    // URL FOR USER'S PROFILE IMAGE
    avatar_url: {
        type: String
    },
    // ACCESS_TOKEN OF THE USER
    access_token: {
        type: String
    },
    // REFRES_TOKEN OF THE USER
    refresh_token: {
        type: String
    },
    // SERVER_TOKEN OF THE USER
    server_token: {
        type: String,
        unique: true
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;