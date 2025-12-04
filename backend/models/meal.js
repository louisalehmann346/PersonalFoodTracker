const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
      name: String,
      calories: Number,
      protein: Number
    });
    
module.exports = mongoose.model("Meal", MealSchema);