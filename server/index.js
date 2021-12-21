const express = require("express"); 
const mongoose = require("mongoose"); 
const app = express(); 
const dotenv = require('dotenv');
dotenv.config(); 

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongo connected")
}).catch((err) => console.log(err)
)

app.listen(5000, ()=> {
    console.log("Backend server is running!")
})