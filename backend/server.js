const express = require('express');
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
dotenv.config()
//app config
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json()) 
app.use(cors())

//db connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads')) //mounting uploads folder at this endpoint
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(PORT,()=>{
    console.log(`Server is started at port ${PORT}`)
})