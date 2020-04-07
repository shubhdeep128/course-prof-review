var Professor = require('../../models/Professor')
const passport = require("passport");
const express = require("express");
require('dotenv/config');


router = express.Router();

router.get("/",async (req,res)=>{
    /// get a list of all courses in the database
    try {
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            const prof = await Professor.find()
            res.json(prof);
            } 
        else{
            res.status(401).send("Unauthorized")
        }
    }
    catch (error) {
        res.json({message: error})
        console.log(error);
    };
});

router.post("/add",async (req,res)=>{
    try {
        
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
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
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            const prof = await Professor.findById(req.params.id);
            res.json(prof); 
        }
        else{
            res.status(401).send("Unauthorized")
        }
    } catch (error) {
        res.json({message: error});
    }
});

router.patch("/:id",async (req,res)=>{
    /// update the attributes of a course in the database 
    try {
        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
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