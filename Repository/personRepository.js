const repo = {};
const model = require('../model/personModel')

repo.findByEmail = async(body)=>{
    let result = await model.findOne({'contactDetails.Email':body.contactDetails.Email});
    console.log("hjjj",result)
    return result;
}



module.exports = repo;