// const express = require("express")
// const {addFood,listFood, removeFood} = require("../controllers/foodController")
// const multer = require("multer")


// const foodRouter = express.Router();

// //image storage engine

// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//       return cb(null,`${Date.now()}${file.originalname}`)
//    }
// })

// const upload = multer({storage:storage})

// foodRouter.post('/add',upload.single("image"),addFood)
// foodRouter.get('/list',listFood)
// foodRouter.post('/remove',removeFood)



// module.exports = foodRouter


const express = require("express");
const { addFood, listFood, removeFood } = require("../controllers/foodController");
const upload = require("../middleware/multer"); // Cloudinary Multer Middleware

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

module.exports = foodRouter;

