var Professor = require('../../models/Professor')
const express = require("express");
const utils = require('./utils')

require('dotenv/config');


router = express.Router();

router.get("/",async (req,res)=>{
    /// get a list of all courses in the database
    try {
        // if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req.user.email, "prof_all", req.device.type);
            const prof = await Professor.find()
            res.json(prof);
        //     } 
        // else{
        //     res.status(401).send("Unauthorized")
        // }
    }
    catch (error) {
        res.json({message: error})
        console.log(error);
    };
});

router.get("/count",async (req,res)=>{
    try {
        

        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req.user.email, "prof_count", req.device.type);
            Professor.countDocuments({},(err,count)=>{
                if(err){
                    res.status(500).send({status:false,error:err})
                }
                else{
                    res.status(200).send({"Professors":count})
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

router.post("/add",async (req,res)=>{
    try {
        
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req.user.email, "prof_add", req.device.type);
            const prof_object = new Professor({
                _id: req.params._id,
                Name: req.body.Name,
                Description: req.body.Description, 
                Relevant_tags: req.body.Relevant_tags
            });
            const savedProf = await prof_object.save();
            console.log("New Professor added successfully");
            res.json({status:true, newProf: prof_object});
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
        // if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req.user.email, "prof_get", req.device.type);
            const prof = await Professor.findById(req.params.id);
            const reviews = await Review.find({Parent: prof._id});
            res.json({prof:prof,reviews:reviews}); 
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
            utils.record_activity(req.user.email, "prof_update", req.device.type);
            const updatedProf = await Professor.updateOne({_id: req.params.id},  {$set: req.body});
            const prof = await Professor.findById(req.params.id);
            console.log("Professor updated successfully");
            res.json(prof);
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
            utils.record_activity(req.user.email, "prof_delete", req.device.type);
            const removedProf = await Professor.deleteOne({_id: req.params.id});
            console.log("Professor deleted successfully")
            res.json(removedProf)
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.json({message: error})
    }
});


module.exports = router;