const express = require("express");
const router = express.Router();
const Tracker = require("../models/tracker");

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (id) {
        const deletedLog = await Tracker.findByIdAndDelete(id);
        return res.status(200).json(deletedLog);
      }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

module.exports = router;