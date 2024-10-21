import createTokenAndSaveCookie from '../jwt/generateToken.js';
import { User } from './../models/usermodel.js';
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;
   // console.log(fullname , email , password , confirmPassword) ;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser =  new User({
            fullname,
            email,
            password : hashPassword,
        });

        await newUser.save();
        if(newUser){
            createTokenAndSaveCookie(newUser._id , res) ;
            res.status(201).json({ message: "User saved successfully" ,  user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
              }, });
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login =async ( req , res)=>{
      const {email , password} = req.body ;
      console.log(password) ;
      try{
        const user = await User.findOne({email}) ; 
        const isMatch =  await bcrypt.compare(password , user.password) ;
        if(!user || !isMatch){
            return res.status(400).json({ error: "Invalid user credential" });
        }
        createTokenAndSaveCookie(user._id , res) ;
        res.status(201).json({
            message: "User logged in successfully",
            user: {
              _id: user._id,
              fullname: user.fullname,
              email: user.email,
            },
        })  ;

      }catch(error){
        console.log(error);
    res.status(500).json({ error: "Internal server error" });
      }
 } ; 

 export const logout = async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  export const getUserProfile = async(req , res)=>{
    try{
      const loggedInUser = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUser },
      }).select("-password");
      res.status(201).json(filteredUsers);
    }catch(error){
      console.log("Error in allUsers Controller: " + error);
    }
  }
  