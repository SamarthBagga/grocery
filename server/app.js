const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 3000');
});
