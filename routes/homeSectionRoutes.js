const express = require('express');
const router = express.Router();
const HomeSection = require('../models/HomeSection');

// GET
router.get('/', async (req, res) => {
  try {
    let data = await HomeSection.findOne();
    if (!data) data = await HomeSection.create({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST update
router.post('/', async (req, res) => {
  try {
    let data = await HomeSection.findOne();
    if (data) {
      Object.assign(data, req.body);
      data.updatedAt = Date.now();
      await data.save();
    } else {
      data = await HomeSection.create(req.body);
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;