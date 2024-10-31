const express = require("express")
const { loginUser, registerUser, updateUserDetails, getUserDetails } = require("../controllers/userController")
const authMiddleware = require("../middleware/auth")


const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.patch("/update", authMiddleware, updateUserDetails); // PATCH route for updating user details
userRouter.get("/details", authMiddleware, getUserDetails); // Protected route for fetching user details


module.exports = userRouter
