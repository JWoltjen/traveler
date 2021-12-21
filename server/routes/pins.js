const router = require("express").Router(); 
const Pin = require("../models/Pin"); 

//create a pin

router.post("/", async (req, res)=>{
    const newPin = new Pin(req.body)
    try{
        const savedPin = await newPin.save(); 
        res.status(200).json(savedPin); 
    }catch(err){
        console.log(err)
    }
})
//get all pins

module.exports = router