require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express');

// creating the express app
const app = express();

(async ()=> {
    try {
    await mongoose.connect(process.env.MONGO_URI);

    const MealSchema = new mongoose.Schema({
      name: String,
      calories: Number,
      protein: Number
    });
    const Meal = mongoose.model("Meal", MealSchema);

    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      weeklyGoal: Number
    });
    const User = mongoose.model("User", userSchema);

    const TrackerSchema = new mongoose.Schema({
      username: String,
      date: Date,
      caloriesConsumed: Number
    });
    const Tracker = mongoose.model("Tracker", TrackerSchema);

    } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    } 
})();

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