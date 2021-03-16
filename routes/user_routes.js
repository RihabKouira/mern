const router = require("express").Router();
const authController = require("../controllers/authcontroller");
const userController = require("../controllers/user_controller");
const uploadController = require("../controllers/upload_controller");
const multer = require("multer");
const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
