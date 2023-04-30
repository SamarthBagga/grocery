const express = require('express');
const multer = require('multer');

const router = express.Router();
const imageController = require('../controllers/image.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/images', upload.single('image'), imageController.createImage);

module.exports = router;
