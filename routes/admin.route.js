const express=require('express')
const {ObjectId}=require('mongodb')
const itemModel=require("../models/items.model")
function foodRoutes() {
    const router=express.Router()
    router.post('/add-food',async (req,res)=>{
        let {itemName,quantity,calories,protein,carbs,fiber,fat}=req.body
        await itemModel.insertOne({
            itemName,quantity,calories,protein,carbs,fiber,fat
        })
        res.redirect('/admin')
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
        res.render('admin')
    })
    return router
}
module.exports=foodRoutes