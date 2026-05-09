const mongoose = require('mongoose');

const agencyPageSchema = new mongoose.Schema({
  // Hero
  heroTitle: { type: String, default: 'The last digital agency you will ever need!' },
  // About Section
  aboutTitle: { type: String, default: 'Turning your business ideas into smart digital products since 2001' },
  aboutDescription: { type: String, default: 'Lorem ipsum dolor sit amet...' },
  aboutImage: { type: String, default: '' },
  // Stats
  stat1Number: { type: String, default: '10+' },
  stat1Label: { type: String, default: 'Years of experience' },
  stat2Number: { type: String, default: '50+' },
  stat2Label: { type: String, default: 'Successful cases' },
  stat3Number: { type: String, default: '12+' },
  stat3Label: { type: String, default: 'Industry awards' },
  // Mission
  missionTitle: { type: String, default: 'Our mission' },
  missionDescription: { type: String, default: 'Fusce fringilla justo vel dui consectetur...' },
  missionImage: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AgencyPage', agencyPageSchema);