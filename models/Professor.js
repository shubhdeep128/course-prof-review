var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Course = require('./Course.js');
var Review = require('./Review.js');

var Professor_schema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
        required:true
    },
    Course: {
        type: [Schema.Types.ObjectId],
        ref: 'Course'
    },
    Reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review'
    },
    Relevent_tags: {
        type: [String]
    },
});

module.exports = Professor = mongoose.model('Professor', Professor_schema);