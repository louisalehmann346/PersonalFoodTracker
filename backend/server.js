require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express');

// creating the express app
const app = express();

mongoose.connect(process.env.MONGO_URI).then( ()=> {
    console.log("MONGO CONNECTED!!!");
}).catch( (err) => {
    console.log("Failure to connect");
    process
})

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'});
});

// listen for requests
// access the port specified in .env
app.listen(process.env.PORT, () =>{
    console.log('listening on port', process.env.PORT);
});

process.env;