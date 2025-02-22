// const foodModel = require("../models/foodModel")
// const fs = require("fs")


// //add food item

// const addFood = async (req,res)=>{
//     let image_filename = `${req.file.filename}`
//     // console.log(req.file)

//     const food = new foodModel({
//         name :req.body.name,
//         description :req.body.description,
//         price :req.body.price,
//         category :req.body.category,
//         image :image_filename,
//     })
//     try{
//         await food.save();
//         res.json({success:true,message:"Food Added"})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// // all-food lists
// const listFood = async(req,res)=>{
//     try{
//         const foods = await foodModel.find({});
//         // console.log(foods)
//         res.json({success:true,data:foods})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// //remove food item

// const removeFood = async (req,res)=>{
//     try{
//         const food = await foodModel.findById(req.body.id)
//         fs.unlink(`uploads/${food.image}`,()=>{})  // for deleting image from the folder
//         await foodModel.findByIdAndDelete(req.body.id) //for deleting food from the foolder
//         res.json({success:true,message:"Food Removed"})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false,message:"Error"})

//     }

// }

// module.exports = {addFood,listFood,removeFood}




const foodModel = require("../models/foodModel");
const cloudinary = require("cloudinary").v2;

// Add Food Item with Cloudinary Upload
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Cloudinary URL from Multer
    const imageUrl = req.file.path; 

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: imageUrl, // Store Cloudinary URL instead of local filename
    });

    await food.save();
    res.json({ success: true, message: "Food Added", food });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding food item" });
  }
};

// List All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching food items" });
  }
};

// Remove Food Item and Delete from Cloudinary
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Extract Public ID from Cloudinary URL
    const imagePublicId = food.image.split('/').pop().split('.')[0];

    // Remove Image from Cloudinary
    await cloudinary.uploader.destroy(`food_images/${imagePublicId}`);

    // Remove Food Item from Database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error removing food item" });
  }
};

module.exports = { addFood, listFood, removeFood };
