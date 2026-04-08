const express=require("express")
const passport = require("passport");
const authController=require("../controllers/auth.controller")
function authRoutes(){
    const router=express.Router()
    router.post('/register',authController.userRegister)
    router.post('/login',authController.userLogin)
    router.get('/',(req,res)=>{
        res.render('login')
    })
    router.get('/register-page',(req,res)=>{
        res.render('register')
    })
    router.get('/logout',(req,res)=>{
        res.clearCookie("token")
        res.redirect('/auth')
    })
    router.get('/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );
    router.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/auth' }),
        (req, res) => {
            const jwt = require("jsonwebtoken");

            const token = jwt.sign(
                { userId: req.user._id },
                process.env.JWT_SECRET
            );

            res.cookie("token", token);
            res.redirect('/user');
        }
    );
    return router
}
module.exports=authRoutes