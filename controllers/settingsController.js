const Settings = require('../models/Settings');

exports.getLogo = async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || { logoUrl: '', logoHeight: 80 });
};

exports.uploadLogo = async (req, res) => {
  const logoUrl = `/uploads/${req.file.filename}`;
  const logoHeight = req.body.logoHeight ? Number(req.body.logoHeight) : 80;
  let settings = await Settings.findOne();
  if (settings) {
    settings.logoUrl = logoUrl;
    settings.logoHeight = logoHeight;
    await settings.save();
  } else {
    settings = await Settings.create({ logoUrl, logoHeight });
  }
  res.json({ success: true, logoUrl, logoHeight });
};