// models/picture.js
const mongoose = require('mongoose');

// Define schema for pictures collection
const pictureSchema = new mongoose.Schema({
  pic_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

// Create model from schema
const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
