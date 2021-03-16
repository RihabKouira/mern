const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookies("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};

//moez
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
