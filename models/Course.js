var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Review = require('./Review.js');
var Professor = require('./Professor.js');

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
    Current_Professor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor'
    },
    Relevant_tags: {
        type: [String]
    },
    Average_grade: {
        type: Number,
        default: 7
    },
    Rating: {
        type: Number,
        default: 3.5,
        min: 0,
        max: 5
    },
    revCount:{
        type: Number,
        default: 1
    }
},
{ 
    timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
    } 
}	
);

module.exports = Course = mongoose.model('Course', Course_schema);