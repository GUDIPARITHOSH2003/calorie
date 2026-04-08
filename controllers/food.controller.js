const express=require("express")
const foodModel=require("../models/food.model")
const itemModel=require("../models/items.model")
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
async function searchItem(req,res){
    let {itemName,userQuantity}=req.body;
    itemName = itemName.replace(/\s+/g, "").toLowerCase();
    let data=await itemModel.findOne({itemName})
    if(!data){
        return res.status(409).json({
            messgae:'item not found enter manually'
        })
    }
    let result={}
    let factor=userQuantity/100
    result.userId=req.user._id
    result.itemName=data.itemName
    result.quantity=userQuantity
    result.calories=data.calories*factor
    result.protein=data.protein*factor
    result.carbs=data.carbs*factor
    result.fiber=data.fiber*factor
    result.fat=data.fat*factor
    let newFood=await foodModel.create(result)
    res.redirect('/user')
}

async function weeklySummary(req,res){
    const userId=req.user._id
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0,0,0,0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23,59,59,999);
    const data=await foodModel.aggregate([
        {
            $match:{
                userId,
                date: { $gte: start, $lte: end }
            }
        },
        {
            $group:{
                _id:"$dayIndex",
                day: { $first: "$dayIndex" },
                totalCalories: { $sum: "$calories" },
                totalProtein: { $sum: "$protein" },
                totalCarbs: { $sum: "$carbs" },
                totalFiber: { $sum: "$fiber" },
                totalFat: { $sum: "$fat" }
            }
        },
        {
            $sort:{
                _id:1
            }
        }
    ])
    res.status(200).json({
        message:'data fetched successfully',
        data
    })
}
module.exports={
    addItem,
    getToday,
    getTodayList,
    deleteItem,
    searchItem,
    weeklySummary
}