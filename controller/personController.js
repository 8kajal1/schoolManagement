const personController = {};
const PersonRepo = require('../Repository/personRepository');
const personModel = require('../model/personModel');
const model= require('../model/personModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var nodemailer = require('nodemailer');

personController.savePerson = async(req,res)=>{
    let body =req.body;
    let exist =await PersonRepo.findByEmail(body);
    if(exist !=null){
        res.send({msg:"person is allready exist"})
    }else{
        let insertBody = await new model(body);
        let result = await insertBody.save();
        res.send(result);
    }
}

personController.findPerson = async(req,res)=>{
    let query = req.query;
    if(query.pageSize){
        pageSize: query.pageSize
     }else{
         query.pageSize =10       
    }
    let pageSize = query.pageSize;
    let skipValue = pageSize* query.pageNo;
    if (!query.pageNo){
        res.send({err:"please provide pageNo"})
        
    } 
    let result = await model.find().skip(skipValue).limit(pageSize);
    res.send(result);
}
personController.registration = async(req,res)=>{
    let body = req.body;
    let date = new Date();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let day = date.getDate();
    let reg = "REG";
    let total = await model.countDocuments();
    let regNo = reg+year+month+day+"000"+(total+1);
    body.regNo = regNo;
    let insertBody = await new model(body);
    let result = await insertBody.save();
    res.send(result) ;

}

personController.signUp= async(req,res)=>{
    let body = req.body;
    let exist = await PersonRepo.findByEmail(body);
    console.log("exist ",exist)
    if(exist!=null){
        res.send({msg:"email is allready exist please provide other email"})
    }else{
     bcrypt.hash(body.contactDetails.password, saltRounds).then(async(hashed)=>{
        body.contactDetails.password= hashed;
        let insertBody = new model(body);
        let result = await insertBody.save();
        res.send({data:result, msg:"SignUp successfully"})
    });
    }
}

personController.login = async(req,res)=>{
    let body = req.body;
    let exist = await PersonRepo.findByEmail(body);
    if(exist!= null){
        bcrypt.compare(body.contactDetails.password,exist.contactDetails.password).then(async(data)=>{
            if(data){
                res.send({msg:"Login successfully"})
            }else{
                res.send({err:"credential is not correct"})
            }
        })

    }else{
        res.send({err:"email is not exist"})
    }
}

personController.email= async(req,res)=>{
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'kajal91283@gmail.com',
        pass: 'vbrh oago mqmg rmkm'
    }
  });
  
  var mailOptions = {
    from: 'kajal91283@gmail.com',
    to: 'kajalgupta89198@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hlw kajal, How are you!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        res.send({msg:"successfully send message"});
      console.log('Email sent: ' + info.response);
    }
  });
}











       


        



    





























 module.exports = personController;