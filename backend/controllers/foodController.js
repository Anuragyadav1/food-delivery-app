const foodModel = require("../models/foodModel")
const fs = require("fs")


//add food item

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`
    // console.log(req.file)

    const food = new foodModel({
        name :req.body.name,
        description :req.body.description,
        price :req.body.price,
        category :req.body.category,
        image :image_filename,
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all-food lists
const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        // console.log(foods)
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//remove food item

const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})  // for deleting image from the folder
        await foodModel.findByIdAndDelete(req.body.id) //for deleting food from the foolder
        res.json({success:true,message:"Food Removed"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

module.exports = {addFood,listFood,removeFood}