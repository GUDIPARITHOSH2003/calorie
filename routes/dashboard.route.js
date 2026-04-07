const express=require("express")
const foodController=require("../controllers/food.controller")
const authMiddleware=require("../middleware/user.auth.middleware")
function dashboardRoutes(db){
    const router=express.Router()
    router.post('/add-item',authMiddleware.isLogged,foodController.addItem)
    router.get('/today-items',authMiddleware.isLogged,foodController.getToday)
    return router
}
module.exports=dashboardRoutes