const express=require("express")
const userModel=require("../models/user.model")
async function changeEmail(req,res){
    let user=req.user;
    let {email}=req.body
    let userExists=await userModel.findOne({email})
    if(userExists){
        return res.status(409).json({
            message:'Email already exists'
        })
    }
    await userModel.updateOne(
        {_id:user._id},
        {$set:{email}}
    )
    let updatedUser=await userModel.findById(user._id)
    res.redirect('/user/profile')
}
async function changeFields(req,res){
    let user=req.user
    let {weight,age,height}=req.body
    let updatedData={}
    if(age){
        updatedData.age=age
    }
    if(weight){
        updatedData.weight=weight
    }
    if(height){
        updatedData.height=height
    }
    await userModel.updateMany(
        {_id:user._id},
        {$set:updatedData}
    )
    let updatedUser=await userModel.findById(user._id)
    res.redirect('/user/profile')
}
async function profilePage(req,res){
    let user=req.user
    res.render('profile',{user})
}
module.exports={
    changeEmail,
    changeFields,
    profilePage
}