var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Review = new Schema({
    Author:{
        type: Object,
        required: true
    },
    Time_stamp:{
        type: Date,
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
    votes: {
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

module.exports = mongoose.model('Review', Review);