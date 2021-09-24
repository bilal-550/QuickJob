const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  surname: {
    type: String,
    default: '',
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema);