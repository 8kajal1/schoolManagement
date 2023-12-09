var express = require('express');
var router = express.Router();
const userController=require('../controller/userController')

router.post('/saveUser',(req,res)=>{
  userController.saveUser(req,res)
  
})
router.get('/find',(req,res)=>{
  userController.find(req,res)
})
router.post('/update',(req,res)=>{
  userController.updates(req,res)
 })
router.post('/delete',(req,res)=>{
  userController.delete(req,res)
})
router.post('/findByRole',(req,res)=>{
  userController.findByRole(req,res)

})
router.post('/findById',(req,res)=>{
  userController.findById(req,res)

})
router.post('/signup',(req,res)=>{
  userController.createAcount(req,res)
})
router.post('/login',(req,res)=>{
  userController.loginAccount(req,res)
})
router.post('/changePassword',(req,res)=>{
  userController.changePassword(req,res)
})


module.exports = router;
