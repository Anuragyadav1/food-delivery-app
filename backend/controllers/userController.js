const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")
const dotenv = require("dotenv");

dotenv.config()


//login user
const loginUser = async (req,res) =>{
    const{email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exist"})

        }
        
        // Compare the plain text password with the hashed password
        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        // Generate token upon successful login
        const token = createToken(user._id)
        res.json({success:true,token})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }
}


//token creation
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body
    try{
        //checking is user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
  //validating email format and strong password
  if(!validator.isEmail(email)){
    return res.json({success:false,message:"Please enter valid email"})
  }

   if(password.length<8){
       return res.json({success:false,message:"Please enter a strong password"})
   }

//hashing user password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

const newUser = new userModel({
    name:name,
    email:email,
    password:hashedPassword
})

const user = await newUser.save();
const token = createToken(user._id)
res.json({success:true,token})

}
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// Update user details
const updateUserDetails = async (req, res) => {
    const userId = req.body.userId; // Get userId from the request
    const { name, email, oldPassword, newPassword } = req.body; // Get updated data from the request
    // console.log(oldPassword,newPassword)

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if old password is provided and verify it
        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password); // Compare old password with hashed password
            if (!isMatch) {
                return res.json({ success: false, message: "Old password is incorrect" });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds
            user.password = hashedPassword; // Update password in user document
        }

        // Update name and email if provided
        if (name) user.name = name;
        if (email) user.email = email;

        // Save updated user details
        const updatedUser = await user.save();
        res.json({ success: true, updatedUser });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating user" });
    }
};


  // get user details
  const getUserDetails = async (req, res) => {
    const userId = req.body.userId; // This is set by your auth middleware
  
    try {
      const user = await userModel.findById(userId); // Fetch the user by ID
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user: { name: user.name, email: user.email } }); // Return relevant user info
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error fetching user details" });
    }
  };

module.exports = {loginUser,registerUser,updateUserDetails,getUserDetails}
