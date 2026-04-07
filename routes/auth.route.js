const express=require("express")
const authController=require("../controllers/auth.controller")
function authRoutes(db){
    const router=express.Router()
    router.post('/register',authController.userRegister)
    router.post('/login',authController.userLogin)
    return router
}
module.exports=authRoutes