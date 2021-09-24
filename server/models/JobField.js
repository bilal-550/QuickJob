const mongoose = require('mongoose');

const jobFieldSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('JobField', jobFieldSchema);