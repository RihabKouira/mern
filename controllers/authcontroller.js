const UserModel = require ("../models/user_model");
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./config/.env" });
const bcrypt = require("bcrypt");
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};


module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}





// const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//   return jwt.sign({id}, process.env.TOKEN_SECRET, {
//     expiresIn: maxAge
//   })
// };

// module.exports.signUp = async (req, res) => {
//   const { pseudo, email, password } = req.body

//   try {
//     const user = await UserModel.create({ pseudo, email, password });
//     let payload={userId: user._id};
//     jwt.sign(payload,process.env.TOKEN_SECRET,(err,token)=>{
//       if (err) throw err;
//       //9otlou yraja3li token
//       res.send({token})
     
//     })
//     //traja3li id:
//     // res.status(201).json({ user: user._id });
//   }
//    catch (err) {
//     res.status(200).send({ err });
//   }
// };

// //signIn
// module.exports.signIn =  async (req, res) => {
  // const { email, password } = req.body;
  //   // console.log({password})
  //   try {
  //     let user = await UserModel.findOne({
  //       email
  //     });
  //     // console.log(user.password)
  //     if (!user)
  //       return res.status(400).json({
  //         message: "User Not Exist"
  //       });

  // UserModel.findById(req.userId)
  // .then(user=>{
  //   if(!user){
  //     return res.status(404).json({msg:"user not found!"})
  //   }
  //   res.status(200).json(user)
  // })
  // .catch((err)=>{ console.error(err.message)
  //   res.status(500).send({msg:"Server Error"})

  // })
  

// }

//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.login(email , password);
//     const token = createToken(user._id);
//     res.cookie('jwt' , token , {httpOnly : true ,maxAge : maxAge * 1000 });
//     res.status(200).json({user : user._id})
//   } 
//   catch(err) {
//     res.status(400).json(err)
//   }
// }

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array()
  //   });
  // }
//   const { email, password } = req.body;
//   // console.log({password})
//   try {
//     let user = await UserModel.findOne({
//       email
//     });
//     // console.log(user.password)
//     if (!user)
//       return res.status(400).json({
//         message: "User Not Exist"
//       });
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log(user.password);
//     console.log(password)

//       console.log(isMatch)


//     if (!isMatch)
//       return res.status(400).json({
//         message: "Incorrect Password !"
//       });
//       const token = jwt.sign({id},'anystring')
//       res.header('auth-token',token).json({'Token':token})
//     }
//   catch (e) {
//     console.error(e);
//     res.status(500).json({
//       message: "Server Error"
//     });
//   }
// }

// module.exports.logout = (req, res) => {
 
//   res.cookie('jwt', '', { maxAge: 1 });
//   res.redirect('/');
 
// }