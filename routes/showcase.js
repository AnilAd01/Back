const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Showcase = require('../models/Showcase');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'showcase-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all showcase items
router.get('/', async (req, res) => {
  try {
    const items = await Showcase.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single showcase item
router.get('/:id', async (req, res) => {
  try {
    const item = await Showcase.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create showcase item
router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { title, category, order } = req.body;
    const cover = req.file ? `/uploads/${req.file.filename}` : '';
    const item = await Showcase.create({ title, category, order, cover });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update showcase item
router.put('/:id', upload.single('cover'), async (req, res) => {
  try {
    const { title, category, order } = req.body;
    const update = { title, category, order };
    if (req.file) update.cover = `/uploads/${req.file.filename}`;
    const item = await Showcase.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE showcase item
router.delete('/:id', async (req, res) => {
  try {
    await Showcase.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;