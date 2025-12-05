const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const {userId, password, dailyGoal} = req.body;
    
    const newUser = new User({
      username: userId,
      password: password,
      dailyGoal: dailyGoal
    });

    console.log(newUser)
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
}

});

module.exports = router;