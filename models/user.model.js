const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: function () {
            return this.authType === "local";
        }
    },
    age:{
        type:Number
    },
    weight:{
        type:Number
    },
    height:{
        type:Number
    },
    authType: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    goal: {
        type: String,
        enum: ["loss", "maintain", "gain"],
        default: "maintain"
    },
    activityLevel: {
        type: String,
        enum: ["sedentary", "light", "moderate", "active", "very_active"],
        default: "sedentary"
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    bmr:Number,
    tdee:Number,
    dailyCalories: Number
})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel