const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const userModel=require("../models/user.model")
async function userLogin(req,res){
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(409).json({
            message:"User don't exist"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(409).json({
            message:'Enter the correct details'
        })
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    return res.status(200).json({
        message:'User logged in successfully',
        user
    })
}
async function userRegister(req,res){
    const {name,email,password,age,weight,height}=req.body
    const isUserExists=await userModel.findOne({email})
    if(isUserExists){
        return res.status(409).json({
            message:'Account already exists'
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await userModel.create({
        name,email,password:hashedPassword,age,weight,height
    })
    let token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    return res.status(201).json({
        message:'user created successfully',
        user
    })
}
module.exports={
    userLogin,
    userRegister
}