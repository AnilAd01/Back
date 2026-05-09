const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Testimonial = require('../models/Testimonial');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'testimonial-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: 1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { name, post, desc, order } = req.body;
    const cover = req.file ? `/uploads/${req.file.filename}` : '';
    const testimonial = await Testimonial.create({ name, post, desc, order, cover });
    res.json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.single('cover'), async (req, res) => {
  try {
    const { name, post, desc, order } = req.body;
    const update = { name, post, desc, order };
    if (req.file) update.cover = `/uploads/${req.file.filename}`;
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;