var Vote = require('../../models/Vote')
const express = require("express");
const utils = require('./utils')
require('dotenv/config');

const router = express.Router();

router.get("/",async (req,res)=>{
    try {
            utils.record_activity(req, "vote_all");
            const votes = await Vote.find()
            res.json(votes);
    }
    catch (error) {
        res.json({message: error})
        console.log(error);
    }
});

router.post("/add",async (req,res)=>{
    try {
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "vote_add");
            const vote_object = new Vote({
                Parent: req.body.Parent,
                Value: req.body.Value,
                Author: req.body.Author
            });
            const savedVote = await vote_object.save();
            console.log("New Vote added successfully",savedVote);
            res.json({status:true, newVote: vote_object});
        }
        else{
            res.status(401).send("Unauthorized")
        }	

    } catch (error) {
        console.log(error)
        res.json({message: error});
    }
    
});
router.get("/count",async (req,res)=>{
    try {
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "vote_count");
            Vote.countDocuments({},(err,count)=>{
                if(err){
                    res.status(500).send({status:false,error:err})
                }
                else{
                    res.status(200).send({"votes":count})
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


router.get('/:id',async (req,res)=>{
    try {
        const vote = await Vote.findById(req.params.id);
        res.json({vote: vote}); 
        console.log(vote);
    } catch (error) {
        res.json({message: error});
    }
});

router.patch("/:id",async (req,res)=>{
    try {
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req, "vote_update");
            const updatedVote = await Vote.updateOne({_id: req.params.id},  {$set: req.body});
            console.log("Vote updated successfully");
            res.json(updatedVote);
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
            utils.record_activity(req, "vote_delete");
            const removedVote = await Vote.deleteOne({_id: req.params.id});
            console.log("Vote deleted successfully")
            res.json(removedVote)
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.json({message: error})
    }
});



module.exports = router;