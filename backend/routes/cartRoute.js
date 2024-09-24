const express = require("express")
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth");


const cartRouter = express.Router(); //using this router we will create multiple endpoints

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)



module.exports = cartRouter