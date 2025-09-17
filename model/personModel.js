const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
    "regNo": String,
    "personalDetails": {
        "firstName": String,
        "lastName": String,
        "DOB":String,
        "age": Number,
        "sex": String,
        "FathersName": String,
        "MothersName": String,
    },
    "contactDetails": {
        "city":String,
        "state":String,
        "Country":String,
        "House/FlatNo":String,
        "street":String,
        "zipcode":String,
        "landmark":String,
        "MobileNo": Number,
        "Email": String,
        "password" : String,
        "newPassword":String,
        "confirmPassword":String
    },
    "qualificationDetails": {
        "graduated":Boolean,
        "universityName":String,
        "college":String,
        "certification": String,
        "branch":String,
    },

});

module.exports = mongoose.model('persons', personSchema)


