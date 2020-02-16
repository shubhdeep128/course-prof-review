var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Review = require('./Review.js')

var Course_schema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
        required: true
    },
    Professor_history: {
        type: [Object]
    },
    Reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review'
    },
    Relevent_tags: {
        type: [String]
    },
    Average_grade: {
        type: Number
    }
});

module.exports = Course = mongoose.model('Course', Course_schema);
