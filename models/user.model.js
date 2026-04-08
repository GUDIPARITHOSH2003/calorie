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
    }
})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel