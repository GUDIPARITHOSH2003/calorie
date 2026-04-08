const express=require("express")
const foodController=require("../controllers/food.controller")
const authMiddleware=require("../middleware/user.auth.middleware")
function dashboardRoutes(){
    const router=express.Router()
    router.post('/add-item',authMiddleware.isLogged,foodController.addItem)
    router.get('/today-items',authMiddleware.isLogged,foodController.getToday)
    router.get('/today-list',authMiddleware.isLogged,foodController.getTodayList)
    router.delete('/delete-item/:id',authMiddleware.isLogged,foodController.deleteItem)
    router.post('/search-item',authMiddleware.isLogged,foodController.searchItem)
    return router
}
module.exports=dashboardRoutes