const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  contacts: {
    type: Array,
    default: [
      { icon: '', iconType: 'react', label: '1-001-234-5678', sublabel: 'Call us: Mon - Fri 9:00 - 19:00' },
      { icon: '', iconType: 'react', label: 'New York', sublabel: '990 Madison Ave, Midtown Manhattan, 2th Floor, NY 10022' },
      { icon: '', iconType: 'react', label: 'info@dream-theme.com', sublabel: 'Drop us a line anytime!' },
      { icon: '', iconType: 'react', label: 'hr@dream-theme.com', sublabel: 'Career at Seven Creative' },
    ]
  },
  socialLinks: {
    type: Object,
    default: {
      facebook: '#',
      behance: '#',
      instagram: '#',
      linkedin: '#',
    }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);