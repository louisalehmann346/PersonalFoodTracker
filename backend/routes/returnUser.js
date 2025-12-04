const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        if (userId) {
            const users = await User.findOne({ username: req.query.userId })
            return res.status(200).json(users);
        }
        else {
            const users = await User.find({})
            res.status(200).json(users);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

module.exports = router