var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShortId = require('mongoose-shortid-nodeps');

var queueSchema = new Schema({
    // THE USER THAT IS IN CONTROL OF THE QUEUE: MUSIC PLAYS ON THEIR DEVICE
    host: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    // THE UNIQUE PIN FOR THE QUEUE. WILL SERVE AS ID WITH CLIENT
    id: {
        type: ShortId,
        len: 6,
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        unique: true
    },
    // NAME OF THE QUEUE
    name: {
        type: String,
        required: true,
        default: "The Collaborative Queue"
    },
    // ACTIVE IF PLAYING, INACTIVE IF NOT PLAYING, DISABLED IF DELETED
    status: {
        type: String,
        enum: ['active', 'inactive', 'disabled'],
        default: 'inactive'
    },
    // ID OF THE SERVER-SIDE INTERVAL LISTENING FOR CHANGES ON HOST'S DEVICE
    interval_id: {
        type: String,
        default: 'No interval set yet'
    },
    // LIST OF TRACKS ADDED BY USER. THIS WILL BE THE QUEUE
    tracks: [{
        id: {
            type: String,
            required: true
        },
        added_by: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        added: {
            type: Date,
            default: new Date()
        },
        context: {
            type: String,
            required: true,
            default: "Queued"
        },
        name: {
            type: String,
        },
        artist: {
            type: String,
        },
    }],
    // POSITION IN TRACK
    position: {
        type: Number,
        default: 0,
        required: true
    },
    // LIST OF USERS IN THE QUEUE. DOESN'T INCLUDE HOST
    users: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }],
    // LIST OF USERS THAT ARE BANNED FROM THE JOINING THE QUEUE
    banned: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',  
    }],
}, {
        timestamps: true
    });

var Queue = mongoose.model('Queue', queueSchema);
module.exports = Queue;