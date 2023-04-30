const Image = require('../models/User.js');

exports.createImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const { caption } = req.body;

    const image = new Image({
      filename,
      caption,
    });

    await image.save();

    res.status(201).json({ message: 'Image created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
