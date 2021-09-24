const mongoose = require('mongoose');
const User = require('./User');

const employeeSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobField: {
    type: Number,
    required: true
  },
  experiences: {
    type: Array
  },
  biography: {
    type: String,
    required: true
  }
});


module.exports = User.discriminator('EmployeeUser', employeeSchema);