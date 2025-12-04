const express = require('express');
const router = express.Router();
const Tracker = require('../models/tracker');

router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId;
      if (userId) {
        const logs = await Tracker.find({ username: req.query.userId }).sort({ date: -1 });
        return res.status(200).json(logs);
      }
      else {
        const logs = await Tracker.find({}).sort({ date: -1 });
        res.status(200).json(logs);
      }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

module.exports = router;