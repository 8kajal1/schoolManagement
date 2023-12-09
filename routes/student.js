const express=require('express')
const router=express.Router()
const studentController=require('../controller/studentController')

router.post('/register',(req,res)=>{
    studentController.register(req,res)
  })
  router.get('/find',(req,res)=>{
    studentController.find(req,res)
 })
 router.post('/update',(req,res)=>{
  studentController.update(req,res)
 })
router.post('/delete',(req,res)=>{
  studentController.delete(req,res)
})
  module.exports = router;
