const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const mailService =require('../services/emailService')
const saltRounds = 10
const userController = {}
const userRepo = require('../Repository/userRepository')
userController.saveUser = async (req, res) => {
    const body = req.body
    let exists = await userRepo.findOneUserByEmail(body);
    if (exists != null) {
        res.send({ err: "email is allready exist" })
    } else {
        const insertBody = new User(body)
        const result = await insertBody.save()
        res.send(result)
    }
}
userController.find = async (req, res) => {
    let query = req.query
    let pageSize = query.pageSize
    let skipValue = query.pageNo * pageSize
    let total = await User.countDocuments({ deleted: { $exists: false } })
    let result = await User.find({ deleted: { $exists: false } }).skip(skipValue).limit(pageSize)
    res.send({ data: result, count: total })
}
userController.findById = async (req, res) => {
    let result = await userRepo.findById(body);
    res.send(result)

}
userController.updates = async (req, res) => {
    let body = req.body
    if (!body.id) {
        res.send({ msg: "id is not exist" })
    } else {
        let exist = await User.findOne({ _id: body.id, deleted: { $exists: false } })
        if (exist != null) {
            let result = await User.updateOne({ _id: body.id }, { $set: body })
            res.send(result)
        } else {
            res.send({ msg: "data is not exist" })
        }
    }
}
userController.delete = async (req, res) => {
    let body = req.body
    if (!body.id) {
        res.send({ err: "please provide the id" })
    } else {
        let exist = await User.findOne({ _id: body.id })
        console.log(exist)
        if (exist != null) {
            let result = await User.updateOne({ _id: body.id }, { $set: { deleted: true } })
            res.send({ result: result, data: "successfully" })
        } else {
            res.send({ err: "id is not exist" })
        }

    }
}
userController.findByRole = async (req, res) => {
    let body = req.body;
    body.deleted = { $exists: false }
    let result = await User.find(body)   //if i pass to object{} in inside find method then it will not print empty array bcoz of nested level
    if (result.length) {   //(result.length>0)  ye v ho skta h
        res.send(result)
    } else {
        res.send({ err: "data is not found" })
    }

}
userController.createAcount = async (req, res) => {
    console.log('coming here')
    let body = req.body
    let exist = await userRepo.findOneUserByEmail(body)
    if (exist != null) {
        res.send({ msg: " You are allready registered, so please signin" })
    } else {
        bcrypt.hash(body.password, saltRounds).then(async (hash) => {
            body.password = hash
            let insertBody = new User(body)
            let result = await insertBody.save()
            await mailService.sendEmail(body);
            res.send({ data: result, msg: "sign up successfully" })

        })

    }
}
userController.loginAccount = async (req, res) => {
    let body = req.body
    let exist = await userRepo.findOneUserByEmail(body)
    if (exist != null) {
        bcrypt.compare(body.password, exist.password).then(async (data) => {
            if (data) {
                const payload= {
                    name:exist.name,
                    email:exist.email,
                    id:exist._id,
                    role:exist.role
                }
                const signOptions={
                    expiresIn:"30000ms",
                    algorithm:"HS256"

                }
                const secretKey="secret"
                const token=await jwt.sign(payload,secretKey,signOptions)
                res.send({ token:token,msg: "Login successfully!" })
            } else {
                res.send({ err: "Credential is not correct" })
            }

        })
    } else {
        res.send({ err: "You are not registered, so Please signUp first" })
    }
}
userController.changePassword = async (req, res) => {
    let body = req.body
    let exist = await userRepo.findOneUserByEmail(body)
    if (exist != null) {
        if (body.newPassword == body.confirmPassword) {
            console.log('bvbvbvbvbv', body)
            let isExistPassword = await bcrypt.compare(body.newPassword, exist.password)
            console.log(isExistPassword)
            if (!isExistPassword) {
                bcrypt.hash(body.newPassword, saltRounds).then(async (hash) => {
                    await User.updateOne({ email: body.email }, { $set: { password: hash } })
                    res.send({msg:"password changed successfully"})
                })
            } else {
                res.send({ err: "old password or new password can not be same" })
            }  
        } else {
            res.send({ err: "please enter another password" })
        }
    } else {
        res.send({ err: "user does not registered!" })

    }
}
module.exports = userController
