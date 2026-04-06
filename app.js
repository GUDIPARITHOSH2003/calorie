const express=require('express')
const app=express()
const {MongoClient,ObjectId} = require('mongodb')
require('dotenv').config()
const port=process.env.PORT || 5000
const foodRoutes=require("./routes/admin.route")
app.use(express.json())
let db;
async function main(){
    //db connection
    const client=new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db=client.db('calorie')

    //routes
    app.use('/admin',foodRoutes(db))

    //port connection
    app.listen(port,(err)=>{
        if (err) throw err
        console.log(`running on port ${port}`)
    })
}

main()