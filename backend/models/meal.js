const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      calories: {
        type: Number,
        required: true
      },
      protein: {
        type: Number,
        default: 0
      }
    });
    
module.exports = mongoose.model("Meal", MealSchema);