require('dotenv').config()
const mongoose = require('mongoose');
const cors = require("cors");
const express = require('express');

// creating the express app
const app = express();

(async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    } 
})();

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(cors());

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'});
});

app.use('/api/meals', require('./routes/meals'));

// listen for requests
// access the port specified in .env
app.listen(process.env.PORT, () =>{
    console.log('listening on port', process.env.PORT);
});

process.env;