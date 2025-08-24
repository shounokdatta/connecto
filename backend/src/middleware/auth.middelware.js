import jwt from "jsonwebtoken";
import userModule from "../modules/user_model.js";

export const protectRoute = async (req, res, next) => {
  
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const user = await userModule.findById(decoded.userId).select("-password -__v"); // ✅ no shadowing
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; 
        next();
    } catch (err) {
        console.log("ERROR in protectRoute middleware:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
