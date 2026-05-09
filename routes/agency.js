const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const AgencyPage = require('../models/AgencyPage');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'agency-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET
router.get('/', async (req, res) => {
  try {
    let data = await AgencyPage.findOne();
    if (!data) data = await AgencyPage.create({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST update text fields
router.post('/', async (req, res) => {
  try {
    let data = await AgencyPage.findOne();
    if (data) {
      Object.assign(data, req.body);
      data.updatedAt = Date.now();
      await data.save();
    } else {
      data = await AgencyPage.create(req.body);
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload about image
router.post('/upload-about-image', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    let data = await AgencyPage.findOne();
    if (data) { data.aboutImage = imageUrl; await data.save(); }
    res.json({ success: true, imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload mission image
router.post('/upload-mission-image', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    let data = await AgencyPage.findOne();
    if (data) { data.missionImage = imageUrl; await data.save(); }
    res.json({ success: true, imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;