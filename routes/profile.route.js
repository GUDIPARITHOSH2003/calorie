const express=require("express")
const profileController=require("../controllers/profile.controller.js")
const userMiddleware=require("../middleware/user.auth.middleware")
function profileRoutes(db){
    const router=express.Router()
    router.post('/change-email',userMiddleware.isLogged,profileController.changeEmail)
    router.post('/change-fields',userMiddleware.isLogged,profileController.changeFields)
    return router
}
module.exports=profileRoutes