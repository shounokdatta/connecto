import User from "../modules/user_model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudnary.js";


export const signup =async (req, res) => {
  console.log("signup controller called");

  const { email,  password } = req.body;
  const fullName = req.body.fullname || req.body.name; // Handle both 'fullname' and 'name' fields
  // console.log("Received body:", req.body);
  console.log("Email:", email);
  console.log("Full Name:", fullName);
  console.log("Password:", password);

  try {
    // 1. Validate inputs
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = new User({
      fullname: fullName,
      email,
      password: hashedPassword,
    });
     // 5. Generate token & set cookie

    generateToken(newUser._id, res);

    await newUser.save();
    


    // 6. Respond with success
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilepic || null,
      },
    });

  } catch (err) {
    console.error("ERROR in signup controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async(req, res) => {
    console.log("login controller called");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("isPasswordCorrect:", isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
            generateToken(user._id, res);


        return res.status(200).json({
            message: "Login successful",
            _id: user._id,
            fullName: user.fullname,
            email: user.email,
            profilePicture: user.profilepic || null,
        });

    } catch (err) {
        console.error("ERROR in login controller:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (err) {
    console.error("ERROR in logout controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  console.log("updateProfile controller called");
  // console.log("Request body:", req);
  try{
    const {profilepic}=req.body;
    const userid=req.user._id; // Assuming req.user is set by the protectRoute middleware
    
   if(!profilepic){
       return res.status(400).json({ message: "Profile picture is required" });

     }
     const uploadResponse= await cloudinary.uploader.upload(profilepic); 
     console.log("Upload response:", uploadResponse);
    const updatedUser = await User.findByIdAndUpdate(
    userid,
    { profilepic: uploadResponse.secure_url},
    { new: true }
  )
  console.log("Updated user:", updatedUser);
  res.status(200).json(updatedUser)

  } catch(err){
    console.error("ERROR in updateProfile controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }

};

export const chackAuth = (req, res) => {
  console.log(req.user);
  try{
    res.status(200).json(req.user)
  }
  catch(err){
    console.error("ERROR in chackAuth controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

