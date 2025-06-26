import User from "../modules/user.model.js";
import bcrypt from "bcrypt";
import { genarateToken } from "../lib/utils.js";


export const signup =async (req, res) => {
    const { email, fullName, password } = req.body;
try{
    //hash password
         if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });    
         }
         const user =await User.findOne({email})
         if(user){
            return res.status(400).json({ message: "User already exists" });
         }

         if(user) return res.status(400).json({ message: "User already exists" });
         const salt=await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         newUser = new User({
            fullname: fullName,
            email: email,
            password: hashedPassword
         });
         if(newUser){
                genarateToken(newUser._id, res);
             await newUser.save();

                    res.status(201).json({
                        message: "User created successfully",
                     user: {
                        id: newUser._id,
                         fullname: newUser.fullName,
                         email: newUser.email,
                         profilePicture: newUser.profilePic,
                }
                     });
            }
            else {
                return res.status(400).json({ message: "Error creating user" });
            }
    } 
    catch(err){
   console.log("ERROR in signup controller", err.message);
    }

};

export const login = (req, res) => {
    res.send("login page");
}
export const logout = (req, res) => {
    res.send("logout page");
}