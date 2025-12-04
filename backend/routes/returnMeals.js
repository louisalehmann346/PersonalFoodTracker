const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

// GET /api/meals - Retrieve all meals
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find({});
        res.status(200).json(meals);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

module.exports = router