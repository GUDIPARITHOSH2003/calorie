const express=require("express")
const userModel=require("../models/user.model")
async function changeEmail(req,res){
    let user=req.user;
    let {email}=req.body
    await userModel.updateOne(
        {_id:user._id},
        {$set:{email}}
    )
    let updatedUser=await userModel.findById(user._id)
    res.status(200).json({
        message:'Updated successfully',
        updatedUser
    })
}
async function changeFields(req,res){
    let user=req.user
    let {weight,age,height}=req.body
    await userModel.updateMany(
        {_id:user._id},
        {$set:{weight,age,height}}
    )
    let updatedUser=await userModel.findById(user._id)
    res.status(200).json({
        message:'User Updated',
        updatedUser
    })
}
module.exports={
    changeEmail,
    changeFields
}