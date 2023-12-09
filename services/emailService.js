const mailService={}
var nodemailer = require('nodemailer');
mailService.sendEmail=async(body)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: 'kajal91283@gmail.com',
          pass: 'ayka hjnd clew zwtg'//password
        }
      });
      
      var mailOptions = {
        from: 'kajal91283@gmail.com',
        to: body.email,
        subject: 'Thank you',
        text: 'Successfully signup and Thank you'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}
module.exports=mailService