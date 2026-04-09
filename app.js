const express=require('express')
const app=express()
const {MongoClient,ObjectId} = require('mongodb')
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser");
const passport=require("passport")
const session=require("express-session")
require('dotenv').config()

const port=process.env.PORT || 5000
const foodRoutes=require("./routes/admin.route")
const authRoutes=require("./routes/auth.route")
const profileRoutes=require("./routes/profile.route")
const dashboardRoutes=require("./routes/dashboard.route")
require("./config/passport");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    secret:'secretkey',
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

let db;
app.set('view engine', 'ejs')
app.set('views','./views')
app.use(cookieParser())

async function main(){
    //db connection
    const client=new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db=client.db('calorie')
    console.log("mongodb connected")
 
    //mongoose connection
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "calorie"
    });
    console.log("Mongoose Connected");
    // console.log("ENV CHECK:", process.env.MY_GOOGLE_CLIENT_ID);
    // console.log("ALL ENV:", process.env);
    //routes
    app.use('/admin',foodRoutes(db))
    app.use('/auth',authRoutes())
    app.use('/user',profileRoutes())
    app.use('/dashboard',dashboardRoutes())

    //port connection
    app.listen(port,(err)=>{
        if (err) throw err
        console.log(`running on port ${port}`)
    })
}

main()