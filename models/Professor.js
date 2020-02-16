var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Professor = new Schema({
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
        type: [Object]
    },
    Reviews: {
        type: [Object]
    },
    Relevent_tags: {
        type: [String]
    },
});

module.exports = mongoose.model('Professor', Professor);