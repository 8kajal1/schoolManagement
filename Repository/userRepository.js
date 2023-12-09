const userRepository = {}
const userModel = require('../model/userModel')
userRepository.findOneUserByEmail = async (body) => {
    const result = await userModel.findOne({ email: body.email ,deleted: { $exists: false }})
    return result;

}
userRepository.findById = async(body)=>{
    const result=await userModel.findOne({_id:body.id,deleted:{$exists: false}})
    return result
}
module.exports = userRepository;