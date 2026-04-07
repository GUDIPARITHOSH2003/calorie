const express=require('express')
const app=express()
const {MongoClient,ObjectId} = require('mongodb')
const mongoose=require("mongoose")
require('dotenv').config()
const port=process.env.PORT || 5000
const foodRoutes=require("./routes/admin.route")
const authRoutes=require("./routes/auth.route")
app.use(express.json())
let db;
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

    //routes
    app.use('/admin',foodRoutes(db))
    app.use('/auth',authRoutes(db))

    //port connection
    app.listen(port,(err)=>{
        if (err) throw err
        console.log(`running on port ${port}`)
    })
}

main()