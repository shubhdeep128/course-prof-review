var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
	    type: String,
	    required: true
  	},
 	email: {
	    type: String,
	    required: true,
	    unique: true
  	},
  	photo: {
	    type: String
    },
    TrustFactor: {
        type: Number,
        default: 3
    },
    Roles: {
        type: String,
        default: "Basic",
        enum: ["Admin","Moderator","Basic"]
    },
    Bio: {
        type: [String]
    }
},
{ 
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at' 
    } 
}	
);

module.exports = User= mongoose.model("users", UserSchema);
