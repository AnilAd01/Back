const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getLogo, uploadLogo } = require('../controllers/settingsController');
const Settings = require('../models/Settings');

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getLogo);
router.post('/logo', upload.single('logo'), uploadLogo);

router.post('/logo-height', async (req, res) => {
  try {
    const { logoHeight } = req.body;
    await Settings.findOneAndUpdate({}, { logoHeight }, { upsert: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;