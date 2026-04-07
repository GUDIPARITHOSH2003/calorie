const express=require("express")
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
async function isLogged(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(409).json({
            message:'Login First'
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findById(decoded.userId)
    req.user=user;
    next();
}
module.exports={
    isLogged
}