const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'WE BUILD DIGITAL EXPERIENCES' },
  heroLogo: { type: String, default: '7' },
  heroLogoText: { type: String, default: 'creative' },
  heroSub1: { type: String, default: 'WEBSITES' },
  heroSub2: { type: String, default: 'BRANDING' },
  heroSub3: { type: String, default: 'DIGITAL MARKETING' },
  sectionTitle: { type: String, default: "The last digital agency you'll ever need" },
  sectionDescription: { type: String, default: '' },
  features: {
    type: Array, default: [
      { icon: 'calendar', title: '10+ years of market experience' },
      { icon: 'ruler', title: 'Unique technologies & modern approach' },
      { icon: 'briefcase', title: '100+ successful cases in portfolio' },
      { icon: 'user', title: 'Customer satisfaction is our top priority' },
    ]
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HomeSection', homeSectionSchema);