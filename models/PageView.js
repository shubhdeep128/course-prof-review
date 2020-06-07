var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PageViewSchema = new Schema({
	email: {
	    type: String,
	    required: true
  	},
 	endpoint: {
 		type: String,
 		required: true
 	},
 	device: {
 		type: String,
 		required: true
 	}
},
{ 
  timestamps: { 
    createdAt: 'created_at'
  } 
}
);

const PageView = mongoose.model("PageView", PageViewSchema);
module.exports = {PageView: PageView};