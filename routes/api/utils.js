var {PageView} = require("../../models/PageView.js");

module.exports = {
	record_activity: function (req, api_endpoint)
	{
		// record that a user has accessed an endpoint right now. 
		// make sure to add a Privacy Policy to your app :p 
		// console.log(req.user, req.device)
		var user = (req.user !== undefined)?req.user.email:"Not Logged In";
		const device_type = (req.device !== undefined)?req.device.type:"Endpoint";
		var record = {email: user, endpoint: api_endpoint, device: device_type};
		PageView.create(record,(err, obj) => {
			if (err) {
				throw err;
			} 
			else {
				console.log(`Surveillance successful. ${api_endpoint}`);
			}
		});
	},
	compare_dates: function (date1, date2){
			if(date1._id.year < date2._id.year){
				return -1;
			}
			else if(date1._id.year > date2._id.year){
				return 1;
			}
			if(date1._id.month < date2._id.month){
				return -1;
			}
			else if(date1._id.month > date2._id.month){
				return 1;
			}
			if(date1._id.day < date2._id.day){
				return -1;
			}
			else if(date1._id.day > date2._id.day){
				return 1;
			}
			return 0;
		}
}
