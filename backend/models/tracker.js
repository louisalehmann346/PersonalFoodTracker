const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      meal: {
        type: String,
        required: true
      }
    });

module.exports = mongoose.model("Tracker", TrackerSchema);
