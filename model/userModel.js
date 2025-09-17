const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    address: String,
    userId: String,
    deleted: Boolean,
    sex: String,
    age: Number,
    mobileNo: Number,
    expertise: String,
    password:String
})
module.exports = mongoose.model('user', userSchema)
