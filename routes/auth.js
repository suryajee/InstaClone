const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const user=mongoose.model("user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config/keys")
const requirelogin=require("../middleware/requirelogin")


router.get("/protected",requirelogin,(req,res)=>{
    res.send("hello user")
})

router.post("/signup",(req,res)=>{
    //console.log(req.body)
    const{name,email,password,pic}=req.body;
    if(!name || !email || !password){
       return  res.status(422).json({error:"plzz fil aall the option"})
    }
    user.findOne({email:email})
    .then((saveduser)=>{
        if(saveduser){
            return  res.status(422).json({error:"this email already present"})
        }

        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const User=new user({
                email,
                password:hashedpassword,
                name,
                pic
            })
            User.save()
            .then(user=>{
                res.json({message:"saved succesfyl"})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        
    })
    .catch((err)=>{
        console.log(err)
    })
})


router.post("/signin",(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return  res.status(422).json({error:"please add email or password"})
    }
    user.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({error:"invaild add email or password"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(domatch=>{
            if(domatch){
               // res.json({message:"successful signed in"})
               const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic}=saveduser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"invaild add email or password"})  
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router;