const mongoose=require("mongoose")
const foodSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
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
    },
    date: {
        type: Date,
        default: Date.now   
    }
})
const foodModel=mongoose.model('food',foodSchema)
module.exports=foodModel