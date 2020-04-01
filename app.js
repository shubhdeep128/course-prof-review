const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const Joi = require('joi');
require('dotenv/config');

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());



//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("connected to MongoDB")
    );

app.listen(3000);
