const mongoose=require("mongoose")
const itemSchema=new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    calories:{
        type:Number,
        required:true
    },
    protein:{
        type:Number,
        required:true
    },
    carbs:{
        type:Number,
        required:true
    },
    fiber:{
        type:Number,
        required:true
    },
    fat:{
        type:Number,
        required:true
    }
})
const itemModel=mongoose.model('item',itemSchema)
module.exports=itemModel