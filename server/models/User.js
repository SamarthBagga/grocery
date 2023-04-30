const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    caption: { type: String },
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;