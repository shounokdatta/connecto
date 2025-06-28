import jwt from "jsonwebtoken";
import user from "../modules/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: "Unauthorized access" });
        }
        
            const decoded =jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded){
                return res.status(401).json({ message: "Unauthorized access" });
            }
            const User = await user.findById(decoded.userId).select("-password -__v");
            if(!User){
                return res.status(404).json({ message: "User not found" });
            }
            req.user = User;
            next();


    }
    catch(err){
        console.log("ERROR in protectRoute middleware:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}