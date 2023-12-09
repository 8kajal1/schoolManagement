const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/schoolDB',{useNewUrlParser:true})
const studentSchema=new mongoose.Schema({
    fName:String,
    lName:String,
    email:String,
    address:String,
    sex:String,
    age:Number,
    mobileNo:Number,
    isAdult:Boolean,
    fatherName:String,
    motherName:String,
    regNo:String,
    guardianName:String
})
module.exports=mongoose.model('students',studentSchema)
