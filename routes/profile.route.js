const express=require("express")
const profileController=require("../controllers/profile.controller.js")
const userMiddleware=require("../middleware/user.auth.middleware")
function profileRoutes(db){
    const router=express.Router()
    router.post('/change-email',userMiddleware.isLogged,profileController.changeEmail)
    router.post('/change-fields',userMiddleware.isLogged,profileController.changeFields)
    router.get('/profile',userMiddleware.isLogged,profileController.profilePage)
    router.get('/',(req,res)=>{
        res.render('home')
    })
    return router
}
module.exports=profileRoutes