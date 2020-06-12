var Course = require('../../models/Course')
var User = require("../../models/User.js");
var Prof = require('../../models/Professor')
var Review = require('../../models/Review')
var {PageView} = require("../../models/PageView.js");
var utils = require("./utils.js");
const express = require("express");
router = express.Router();
const pipelineHelper = (old_time,now) => {
	return(
		[
			{	
				"$match": {
					"created_at": {
						"$gte": old_time,
						"$lte": now
					}    		
				}
			},
			{
				"$group": {
					"_id": {
						"year":  { "$year": "$created_at"  },
						"month": { "$month": "$created_at" },
						"day":   { "$dayOfMonth": "$created_at" }
					},
					"count": { "$sum": 1 }
				}
			}
		]
	)
}

	router.get("/", (req,res)=>{
		res.status(200).send({message: "State surveillance metrics exposed in a public API."})
	});


  router.get("/course", (req,res)=>{
	var days = req.query.days;
	console.log(days);
	if(days == undefined) days = 6;
	console.log("[STATS: Courses] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	console.log(now,old_time)
	Course.aggregate(pipelineHelper(old_time,now), function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
		}
	    res.status(200).send({data: daywise_data});
	});
  });


  router.get("/prof", (req,res)=>{
	var days = req.query.days;
	console.log(days);
	if(days == undefined) days = 6;
	console.log("[STATS: Prof] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	console.log(now,old_time)
	Prof.aggregate(pipelineHelper(old_time,now), function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
		}
	    res.status(200).send({data: daywise_data});
	});
  });
  router.get("/review", (req,res)=>{
	var days = req.query.days;
	console.log(days);
	if(days == undefined) days = 6;
	console.log("[STATS: Reviews] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	console.log(now,old_time)

	Review.aggregate(pipelineHelper(old_time,now), function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
		}
	    res.status(200).send({data: daywise_data});
	});
  });

  router.get("/users", (req,res)=>{
	var days = req.query.days;
	if(days == undefined) days = 6;
	console.log("[STATS: Users] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	User.aggregate(pipelineHelper(old_time,now), function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		var total = 0;
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
			total = total+result[i].count
		}
	    res.status(200).send({data: daywise_data, total: total});
	});
  });

  router.get("/visits", (req,res)=>{
	var days = req.query.days;
	console.log(days);
	if(days == undefined) days = 6;
	console.log("[STATS: SiteVisists] Returning last", days, "days of data");
	var now = new Date();
	var old_time = new Date(now.getTime()  - (days * 24 * 60 * 60 * 1000));
	console.log(now,old_time)
	PageView.aggregate(pipelineHelper(old_time,now), function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
		result.sort(utils.compare_dates);
		var daywise_data = [];
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
		}
		var total = 0;
		for(var i=0;i<result.length;i++){
			daywise_data.push(result[i].count);
			total = total+result[i].count
		}
	    res.status(200).send({data: daywise_data, count : total});
	});
  });

  router.get("/views/total", (req,res)=>{
  	var request_type = req.query.type; 

	if(!(request_type == "device" || request_type == "endpoint")){
		request_type = "device"; // default
	}
  	var pipeline = [
	    {"$match":{}},
	    {
	        "$group": {
	            "_id": {
	            	"label": "$" + request_type
	            },
	            "count": { "$sum": 1 }
	        }
	    }
	];
	PageView.aggregate(pipeline, function (err, result){
	    if (err) res.status(500).send({message:"Internal server error."});
	    else res.status(200).send({type: request_type, data: result});
	});
  });

  router.get("/views/", (req,res)=>{
  	PageView.countDocuments({},(err, count) => {
      if (err) {
        res.status(500).send({status:false, error:err})
      } 
      else {
        res.status(200).send({"views": count});
      }
    });


  });


module.exports = router