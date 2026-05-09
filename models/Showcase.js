const mongoose = require('mongoose');

const showcaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  cover: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Showcase', showcaseSchema);