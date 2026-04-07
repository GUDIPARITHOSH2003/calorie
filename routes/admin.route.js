const express=require('express')
const {ObjectId}=require('mongodb')
function foodRoutes(db) {
    const router=express.Router()
    const collection=db.collection('food')
    router.post('/add-food',async (req,res)=>{
        const {name,quantity,calories,protein,fiber,fat}=req.body;
        await collection.insertOne({
            name,quantity,calories,protein,fiber,fat
        })
        res.status(201).send('Item Added succesfully')
    })
    router.get('/all-items',async (req,res)=>{
        let data = await collection.find({}).toArray()
        res.render('adminDisplay',{data})
        // res.send(data)
    })
    router.post('/delete/:id',async (req,res)=>{
        await collection.deleteOne({_id:new ObjectId(req.params.id)})
        res.redirect('/admin/all-items')
    })
    router.get('/',(req,res)=>{
        res.render('admin')
    })
    return router
}
module.exports=foodRoutes