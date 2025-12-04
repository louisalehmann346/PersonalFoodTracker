const express = require("express");
const router = express.Router();
const Tracker = require("../models/tracker");
const Meal = require("../models/meal");

router.post("/", async (req, res) => {
  try {
    const {userId, meal, date} = req.body;
    console.log(req.body);
    
    const newLog = new Tracker({
      username: userId,
      date: date,
      meal: meal
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;