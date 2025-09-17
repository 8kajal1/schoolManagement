const express = require('express')
const router = express.Router();
const personController = require('../controller/personController')

router.post('/save',(req,res)=>{
    personController.savePerson(req,res);

})
router.get('/find',(req,res)=>{
    personController.findPerson(req,res);
    
})

router.post('/registration',(req,res)=>{
    personController.registration(req,res);
})

router.post('/signUp',(req,res)=>{
    personController.signUp(req,res);
})

router.post('/login',(req,res)=>{
    personController.login(req,res);
})

router.post('/changePassword', (req,res)=>{
    personController.changePassword(req,res);
})

router.get ('/email', (req,res)=>{
    personController.email(req,res);
})

module.exports = router;