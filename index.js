const express = require('express');
const app = express();
const passport = require("passport")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require("path")
const cookieSession = require("cookie-session");
require('dotenv/config');

//MIDDLEWARES
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))


//IMPORT SCHEMAS AND CONNECT TO DB
require("./models/User.js");
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("connected to MongoDB")
    );


app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ["somesecretsauce"]
    })
  );
  

//  PASSPORT AUTH

app.use(passport.initialize());
app.use(passport.session());
require("./passport.js");
require("./routes/api/auth.js")(app);

//  ROUTES
app.get('/home',(req,res) => {
    res.send("HOME");
})
app.get("/api", (req,res)=>{
    console.log(req.user)
    res.send({"message": "Welcome to the course-prof microservice API."});
});


PORT = process.env.PORT || 5050
app.listen(PORT,function(){
    console.log("Listening on port ",PORT)
});
