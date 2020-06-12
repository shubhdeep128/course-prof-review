var Review = require('../../models/Review')
var Vote = require('../../models/Vote');
const express = require("express");
const utils = require('./utils')

require('dotenv/config');

const router = express.Router();

router.get("/",async (req,res)=>{
    /// get a list of all reviews in the database
    try {
        // if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "reveiew_all");
            const review = await Review.find()
            res.json(review);
        // }
        // else{
        //     res.status(401).send("Unauthorized")
        // }	
    }
    catch (error) {
        res.json({message: error})
        console.log(error);
    }
});

router.get("/count",async (req,res)=>{
    try {
        

        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "review_count");
            Review.countDocuments({},(err,count)=>{
                if(err){
                    res.status(500).send({status:false,error:err})
                }
                else{
                    res.status(200).send({"Reviews":count})
                }
            })

        }
        else{
            res.status(401).send("Unauthorized")
        }	

    } catch (error) {
        console.log(error)
        res.json({message: error});
    }
    
});

router.get("/votes/:id", async(req,res) => {
    try {
        const votes = await Vote.find({Parent: req.params.id});
        res.json(votes);
    }
    catch (error) {
        res.json({message: error})
        console.log(error);
    }
})

router.post("/add",async (req,res)=>{
    try {
        
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "review_add");
            const review_object = new Review({
                Parent: req.body.Parent,
                Author: req.body.Author,
                Time_stamp: req.body.Time_stamp, 
                Description: req.body.Description, 
                Difficulty: req.body.Difficulty, 
                Rating: req.body.Rating, 
                Votes: req.body.Votes
            });
            const savedReview = await review_object.save();
            console.log("New Review added successfully");
            res.json({status:true, newReview: review_object, savedReview});
        }
        else{
            res.status(401).send("Unauthorized")
        }	
    } catch (error) {
        res.json({message: error});
    }
    
});

router.get('/:id',async (req,res)=>{
    try {
        utils.record_activity(req, "review_get");
            const review = await Review.findById(req.params.id);
            res.json(review); 
        // }
        // else{
        //     res.status(401).send("Unauthorized")
        // }
    } catch (error) {
        res.json({message: error});
    }
});

router.patch("/:id",async (req,res)=>{
    /// update the attributes of a course in the database 
    try {
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "review_update");
            const updatedReview = await Review.updateOne({_id: req.params.id},  {$set: req.body});
            const review = await Review.findById(req.params.id);
            console.log("Professor updated successfully");
            res.json(review);
        }
        else{
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.json({message: error});
    }

});

router.delete('/:id',async (req,res) => {
    try {
        if (req.isAuthenticated() || process.env.NODE_ENV == "test") {
            utils.record_activity(req, "review_update");
            const removedReview = await Review.deleteOne({_id: req.params.id});
            console.log("Review deleted successfully")
            res.json(removedReview)
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.json({message: error})
    }
});




module.exports = router;