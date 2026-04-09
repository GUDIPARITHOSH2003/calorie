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
    let {weight,age,height,goal,activityLevel,gender}=req.body
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
    updatedData.goal=goal
    updatedData.activityLevel=activityLevel
    updatedData.gender=gender
    await userModel.findByIdAndUpdate(user._id, {
        $set: updatedData
    })
    let updatedUser=await userModel.findById(user._id)
    res.redirect('/user/profile')
}
async function profilePage(req,res){
    let user=req.user
    res.render('profile',{user,error: null})
}
async function calculateCalories(req,res){
    let user=await userModel.findById(req.user._id)
    const weight = Number(user.weight);
    const height = Number(user.height);
    const age = Number(user.age);
    const gender = user.gender;
    const activityLevel = user.activityLevel;
    const goal = user.goal;
    if (!weight || !height || !age || !gender || !activityLevel || !goal) {
        return res.render('profile',{user,error:"Please enter age, weight, height, gender, activity level and goal"})
    }
    let bmr
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityMap = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };
    const tdee = bmr * activityMap[activityLevel];
    let dailyCalories;
    if (goal === "loss") {
        dailyCalories = tdee - 500;
    } else if (goal === "gain") {
        dailyCalories = tdee + 500;
    } else {
        dailyCalories = tdee;
    }

    const result = {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        dailyCalories: Math.round(dailyCalories)
    };
    await userModel.findByIdAndUpdate(req.user._id, {
        $set: result
    });
    res.redirect('/user/profile')
}
module.exports={
    changeEmail,
    changeFields,
    profilePage,
    calculateCalories
}