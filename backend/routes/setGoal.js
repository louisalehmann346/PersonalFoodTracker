const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const {userId, goal} = req.body;
    console.log(req.body);
    
    await User.updateOne(
    { username: userId },
    { $set: { dailyGoal: goal } }
    );

    res.status(201).json({ message: "Goal updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;