const express=require('express')
const {ObjectId}=require('mongodb')
const itemModel=require("../models/items.model")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
function foodRoutes(db) {
    const router=express.Router()
    router.post('/add-food',async (req,res)=>{
        let {itemName,quantity,calories,protein,carbs,fiber,fat}=req.body
        await itemModel.insertOne({
            itemName,quantity,calories,protein,carbs,fiber,fat
        })
        res.redirect('/admin/home')
    })
    router.get('/all-items',async (req,res)=>{
        let data = await itemModel.find({})
        res.render('adminDisplay',{data})
        // res.send(data)
    })
    router.post('/delete/:id',async (req,res)=>{
        await itemModel.deleteOne({_id:new ObjectId(req.params.id)})
        res.redirect('/admin/all-items')
    })
    router.get('/',(req,res)=>{
        res.render('adminLogin')
    })
    router.post('/login',async (req,res)=>{
        let {email,password}=req.body;
        let collection=db.collection('admin')
        let admin=await collection.findOne({email})
        if (!admin){
            return res.status(409).json({
                message:'You cant enter'
            })
        }
        const isMatch=await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return res.status(409).json({
                message:'You cant enter'
            })
        }
        let token=jwt.sign({userId:admin._id},process.env.JWT_SECRET)
        res.cookie("token",token)
        res.redirect('/admin/home')
    })

    router.get('/home',(req,res)=>{
        res.render('admin')
    })

    router.get('/logout',(req,res)=>{
        res.clearCookie("token")
        res.redirect('/admin')
    })
    return router
}
module.exports=foodRoutes