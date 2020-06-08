const passport = require("passport");
const express = require("express");
const app = express();
const User = require('../../models/User')
const utils = require('./utils')

module.exports = app => {
  app.get("/auth/test", (req, res) => {
    res.send("Auth Working properly");
  });
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user/count",async (req,res)=>{
    try {
        

        if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
            utils.record_activity(req.user.email, "user_count", req.device.type);
            User.countDocuments({},(err,count)=>{
                if(err){
                    res.status(500).send({status:false,error:err})
                }
                else{
                    res.status(200).send({"users":count})
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


  app.get("/api/user/:id",async (req,res)=>{
    try {
      utils.record_activity(req.user.email, "user_get", req.device.type);
      const user = await User.findById(req.params.id);
      res.json({user:user});
      console.log(user);
    } catch (error) {
      res.json({message: error})
      console.log(error);
    }
  });

  
  app.get("/api/current_user", (req, res) => {
    if(req.isAuthenticated() || process.env.NODE_ENV == "test"){
      utils.record_activity(req.user.email, "current_user", req.device.type);
      res.send({user:req.user,loggedIn:true});
    }
    else{
      res.send({user:{Roles: "Unauthorized"},loggedIn:false})
    }
  });
};
