const express = require("express");
const router = express.Router();
const Tracker = require("../models/tracker");
const Meal = require("../models/meal");

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("UserId for aggregation:", userId);
    const today = new Date();

    const startOfMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const startOfNextMonthStr = `${startOfNextMonth.getFullYear()}-${String(startOfNextMonth.getMonth() + 1).padStart(2, "0")}-01`;

    const result = await Tracker.aggregate([
      {
        $addFields: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
        }
      },
      {
        $match: {
          day: { $gte: startOfMonthStr, $lt: startOfNextMonthStr },
          username: userId
        }
      },
      {
        $lookup: {
          from: "meals",
          localField: "meal",
          foreignField: "name",
          as: "mealInfo"
        }
      },
      { $unwind: "$mealInfo" },

      {
        $group: {
          _id: "$day",
          totalCalories: { $sum: "$mealInfo.calories" },
          totalProtein: { $sum: "$mealInfo.protein" },
          meals: {
            $push: {
              name: "$mealInfo.name"
            }
          }
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;