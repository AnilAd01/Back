const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ContactInfo = require('../models/ContactInfo');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'contact-icon-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET contact info
router.get('/', async (req, res) => {
  try {
    let data = await ContactInfo.findOne();
    if (!data) data = await ContactInfo.create({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST update contact info
router.post('/', async (req, res) => {
  try {
    let data = await ContactInfo.findOne();
    if (data) {
      Object.assign(data, req.body);
      data.updatedAt = Date.now();
      await data.save();
    } else {
      data = await ContactInfo.create(req.body);
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upload icon image
router.post('/upload-icon', upload.single('icon'), async (req, res) => {
  try {
    const iconUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, iconUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;