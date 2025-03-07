const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                return /^https?:\/\/res\.cloudinary\.com\/.*$/.test(url);
            },
            message: "Invalid Cloudinary image URL",
        },
    }
,
    category:{
        type:String,
        required:true
    }
})

const foodModel = mongoose.model("food",foodSchema)
module.exports = foodModel