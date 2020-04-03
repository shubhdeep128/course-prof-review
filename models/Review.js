var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./User.js');

var Review_schema = new Schema({
    Author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Time_stamp:{
        type: Date,
        default: Date.now,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Difficulty:{
        type: Number,
        required: true
    },
    Rating:{
        type: Number,
        required: true
    },
    Votes: {
            up_vote: {
                type: Number,
                default: 0
            },
            down_vote: {
                type: Number,
                default: 0
            }
    }
});

module.exports = Review = mongoose.model('Review', Review_schema);
