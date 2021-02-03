const router = require("express").Router();
const authController = require("../controllers/authcontroller");
const userController = require("../controllers/user_controller");
const { body} = require('express-validator');
const authMiddleware = require ('../middelware/authMeddleware')


// router.post("/register", [body('email','Please Enter a Valid Email ').isEmail(),body('password','Minimun length Allowed is 5 characters').isLength({ min: 5 })],authController.signUp);
// router.get("/login",authMiddleware, authController.signIn);

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);


module.exports = router;
