// const jwt = require("jsonwebtoken");
// require("dotenv").config({ path: "./config/.env" });

// const UserModel = require("../models/user_model");
// module.exports= (req,res, next)=>{
//     let token=req.header('auth-token')

//     if(!token){
//         return res.status(401).json({ msg:"YOU ARE NOT AUTHORIZED !"})

//     }
//     jwt.verify(token,process.env.TOKEN_SECRET, (err,payload)=>{
//         if (err) throw err;
//         req.userId= payload.userId
//         next()
//     })
// }