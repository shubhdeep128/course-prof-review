const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://shubh_162:hx3G011451pnfuE4@cluster0-9qlu7.mongodb.net/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
 
//Connecting Node and MongoDB
require('./Course');
require('./Professor');