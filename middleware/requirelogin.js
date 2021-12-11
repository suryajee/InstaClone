const jwt=require("jsonwebtoken");
const { Mongoose } = require("mongoose");
const {JWT_SECRET}=require("../config/keys")
const mongoose=require("mongoose");
const user=mongoose.model("user");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        //authorization===Bearer ahrashdasasdgajr
       return res.status(401).json({error:"you must be login"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be login"})
        }

        const {_id}=payload
        user.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })
      
    })

}