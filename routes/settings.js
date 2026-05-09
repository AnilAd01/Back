const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getLogo, uploadLogo } = require('../controllers/settingsController');
const Settings = require('../models/Settings');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 'logo' + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', getLogo);
router.post('/logo', upload.single('logo'), uploadLogo);

// ← add this new route
router.post('/logo-height', async (req, res) => {
  try {
    const { logoHeight } = req.body
    await Settings.findOneAndUpdate({}, { logoHeight }, { upsert: true })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;