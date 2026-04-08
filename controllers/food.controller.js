const express=require("express")
const foodModel=require("../models/food.model")
async function addItem(req,res){
    let {itemName,quantity,calories,protein,carbs,fiber,fat}=req.body
    let user=req.user
    let food=await foodModel.create({
        userId:user._id,itemName,quantity,calories,protein,carbs,fiber,fat,date: new Date()
    })
    res.redirect('/user')
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
async function getTodayList(req,res){
    res.render('todayList')
}
async function deleteItem(req,res){
    const id=req.params.id
    await foodModel.deleteOne({
        _id:id,
        userId:req.user._id
    })
    res.status(200).json({
        message:'item deleted successfully'
    })
}
module.exports={
    addItem,
    getToday,
    getTodayList,
    deleteItem
}