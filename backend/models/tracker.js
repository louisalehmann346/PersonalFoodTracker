const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
      username: String,
      date: Date,
      caloriesConsumed: Number
    });

module.exports = mongoose.model("Tracker", TrackerSchema);
