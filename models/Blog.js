const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, default: '' },
  category: { type: String, default: 'GENERAL' },
  date: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  content: { type: String, default: '' },
  subtitle2: { type: String, default: '' },
  content2: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);