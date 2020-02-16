var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Course = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
        required:true
    },
    Professor_history: {
        type: [Object]
    },
    Reviews: {
        type: [Object]
    },
    Relevent_tags: {
        type: [String]
    },
    Average_grade: {
        type: Number
    }
});

module.exports = mongoose.model('Course', Course);
// test = mongoose.model('Course', Course);
