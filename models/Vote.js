var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Vote_Schema = new Schema({

    Parent: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },

    Value: {
        type: Number,
        default: 1,
        enum: [-1,1]
    },
    Author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{ 
    timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
    } 
}	
);

module.exports = Vote = mongoose.model('Vote', Vote_Schema);