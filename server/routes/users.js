const router = require("express").Router(); 
const User = require("../models/User"); 
const bycrpt = require("bcrypt")

//register

router.post("/register", async (req, res)=>{
    try{
        //generate new password 
        const salt = await bycrpt.genSalt(10); 
        const hashedPassword = await bycrpt.hash(req.body.password, salt)
        //create new user 
        const newUser = new User({
            username: req.body.username, 
            email:req.body.email,
            password:hashedPassword,
        })
        //save user and send response


    }catch(err){
        res.status(500).json(err)
    }
})

//login

module.exports = router