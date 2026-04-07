const express=require("express")
const authController=require("../controllers/auth.controller")
function authRoutes(db){
    const router=express.Router()
    router.post('/register',authController.userRegister)
    router.post('/login',authController.userLogin)
    router.get('/',(req,res)=>{
        res.render('login')
    })
    router.get('/register-page',(req,res)=>{
        res.render('register')
    })
    return router
}
module.exports=authRoutes