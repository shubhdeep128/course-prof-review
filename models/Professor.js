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
    Rating:{
        type: Number,
        default: 3.5
    },
    Relevant_tags: {
        type: [String]
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

module.exports = Professor = mongoose.model('Professor', Professor_schema);