const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Service = require('../models/Service');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'service-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { title, order } = req.body;
    const desc = JSON.parse(req.body.desc || '[]');
    const cover = req.file ? `/uploads/${req.file.filename}` : '';
    const service = await Service.create({ title, cover, desc, order });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.single('cover'), async (req, res) => {
  try {
    const { title, order } = req.body;
    const desc = JSON.parse(req.body.desc || '[]');
    const update = { title, desc, order };
    if (req.file) update.cover = `/uploads/${req.file.filename}`;
    const service = await Service.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;