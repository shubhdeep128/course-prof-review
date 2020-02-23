const passport = require("passport");
const express = require("express");
const app = express();

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
    res.redirect("/api");
  });

  app.get("/api/current_user", (req, res) => {
    if(req.isAuthenticated()){
      res.send(req.user);
    }
    else{
      res.status(401).send("Unauthorized")
    }
  });
};
