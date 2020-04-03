var Course = require('../../models/Course')
const passport = require("passport");
const express = require("express");

router = express.Router();

router.get("/",async (req,res)=>{
    /// get a list of all courses in the database
    try {
        if(req.isAuthenticated()){
            const course = await Course.find()
            res.json(course);
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
        
         if(req.isAuthenticated()){
            const course_object = new Course({
                Name: req.body.Name,
                Description: req.body.Description, 
                Professor_history: req.body.Professor_history, 
                Reviews: req.body.Reviews, 
                Relevant_tags: req.body.Relevant_tags, 
                Average_grade: req.body.Average_grade
            });
            const savedCourse = await course_object.save();
            console.log("New Course added successfully");
            res.json({status:true, newCourse: course_object});
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
         if(req.isAuthenticated()){
            const course = await Course.findById(req.params.id);
            res.json(course); 
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
        if(req.isAuthenticated()){
            const updatedCourse = await Course.updateOne({_id: req.params.id},  {$set: req.body});
            const course = await Course.findById(req.params.id);
            console.log("Course updated successfully");
            res.json(course);
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
        if (req.isAuthenticated()) {
            const removedCourse = await Course.deleteOne({_id: req.params.id});
            console.log("Course deleted successfully")
            res.json(removedCourse)
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.json({message: error})
    }
});


module.exports = router;