const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
      username: String,
      date: Date,
      meal: String
    });

module.exports = mongoose.model("Tracker", TrackerSchema);
