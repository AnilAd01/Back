const Settings = require('../models/Settings');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.getLogo = async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || { logoUrl: '', logoHeight: 80 });
};

exports.uploadLogo = async (req, res) => {
  try {
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'creative-agency' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    const logoUrl = result.secure_url;
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
};