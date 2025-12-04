const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      weeklyGoal: Number
    });

module.exports = mongoose.model("User", userSchema);