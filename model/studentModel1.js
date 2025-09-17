const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    "name": String,
    "roll":Number,
    "email":String,
    "mobileNo" :Number
  });
module.exports= mongoose.model('student', studentSchema);





