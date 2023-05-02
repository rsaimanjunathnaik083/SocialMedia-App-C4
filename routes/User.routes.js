const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();
const userRouter = express.Router();

//Registration

userRouter.post("/register", (req,res)=>{
    const {name, email, gender, password} = req.body;

    try {
        bcrypt.hash(password, 8, async(err, hashedPassword) => {
            if(err){
                console.log(err);
            }else{
                const user = new UserModel({
                    name,
                    email, 
                    gender,
                    password: hashedPassword,
                });
                await user.save();
                res.status(200).send("New User has Registered Successfully")
            }
        });
    } catch (err) {
        res.status(404).send("Error in registering the New User");
        console.log(err);
    }
});


//Login 
userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await UserModel.find({ email });
        if(user.length > 0) {
            const hashedPassword = user[0].password;
            bcrypt.compare(password, hashedPassword, async(err, result) =>{
                if(result){
                    const token = jwt.sign({userID: user[0]._id}, process.env.key);
                    res.send({msg: "Login Success", token: token});
                }else{
                    res.send("Wrong Credentials");
                    console.log(err);
                }
            });
        }else{
            res.send("Login Failed")
        }
    } catch (err) {
        console.log(err);
        res.status(404).send("Something went wrong");
    }
});

module.exports ={ userRouter }
