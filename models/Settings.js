const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  logoUrl: { type: String, default: '' },
  logoHeight: { type: Number, default: 80 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);