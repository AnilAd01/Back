const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  title: { type: String, required: true },
  post: { type: String, default: '' },
  cover: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);