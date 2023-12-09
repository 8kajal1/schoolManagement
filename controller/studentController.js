const Student=require('../model/studentModel')
const studentController={}
studentController.register=async(req,res)=>{
    const body=req.body
    const date=new Date()
    const month=date.getMonth()+1
    const year=date.getFullYear()
    const total=await Student.countDocuments()
    const school="Narayan"
    const schoolVal=school.slice(0,3).toUpperCase();
    const userVal = body.fName.slice(0,3);
    const regNo = schoolVal+year+month+userVal.toUpperCase()+"00"+(total+1);
    body.regNo = regNo;
    const insertBody=new Student(body)
    const result=await insertBody.save()
    res.send(result)

}
studentController.find=async(req,res)=>{
    let query= req.query
    let pageSize= query.pageSize
    let skipValue= query.pageNo*pageSize
     let total=await Student.find().countDocuments()
     let result= await Student.find().skip(skipValue).limit(pageSize)
    res.send({data:result,count: total})
} 
studentController.update=async(req,res)=>{
    let body= req.body
    if(!body.id){
        res.send({err:"please provide the id"})
    }else{
    let result= await Student.updateOne({_id:body.id},{$set:body})
    res.send(result)
    }
}
studentController.delete=async(req,res)=>{
    let body= req.body
     if(!body._id){
        res.send({err:"please provide the id"})
    }else{
        let exist= await Student.findOne({_id:body._id})
        if(exist!=null){
            let result= await Student.deleteOne({_id:body._id})
           res.send({result:result,data:"successfully"})
       }else{
        res.send({err:"id is not exist"})
    }
    
}}
module.exports=studentController