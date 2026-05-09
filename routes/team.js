const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const TeamMember = require('../models/TeamMember');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'team-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new member
router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { title, post, order } = req.body;
    const cover = req.file ? `/uploads/${req.file.filename}` : '';
    const member = await TeamMember.create({ title, post, cover, order });
    res.json({ success: true, member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update member
router.put('/:id', upload.single('cover'), async (req, res) => {
  try {
    const { title, post, order } = req.body;
    const update = { title, post, order };
    if (req.file) update.cover = `/uploads/${req.file.filename}`;
    const member = await TeamMember.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE member
router.delete('/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;