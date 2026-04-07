const express=require("express")
const foodModel=require("../models/food.model")
async function addItem(req,res){
    let {itemName,calories,protein,carbs,fiber,fat}=req.body
    let user=req.user
    let food=await foodModel.create({
        userId:user._id,itemName,calories,protein,carbs,fiber,fat
    })
    res.status(201).json({
        message:'Items added successfully',
        food
    })
}
async function getToday(req,res){
    const userId=req.user._id
    const start=new Date()
    start.setHours(0,0,0,0)
    const end=new Date()
    end.setHours(23,59,59,999)
    const data=await foodModel.find({
        userId,
        date:{
            $lte:end,
            $gte:start
        }
    })
    res.status(200).json(data)
}
module.exports={
    addItem,
    getToday
}