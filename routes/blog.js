const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'blog-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ order: 1, createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create blog
router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { title, category, date, content, subtitle, subtitle2, content2, order } = req.body;
    const cover = req.file ? `/uploads/${req.file.filename}` : '';
    const blog = await Blog.create({ title, category, date, content, subtitle, subtitle2, content2, order, cover });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update blog
router.put('/:id', upload.single('cover'), async (req, res) => {
  try {
    const { title, category, date, content, subtitle, subtitle2, content2, order } = req.body;
    const update = { title, category, date, content, subtitle, subtitle2, content2, order };
    if (req.file) update.cover = `/uploads/${req.file.filename}`;
    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;