import User from "../modules/user.model.js";

export const signup = (req, res) => {
    const { email, fullname, password } = req.body;
try{
         if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });    
         }
         const user =awit User.findOne({email})

         if(user) return res.status(400).json({ message: "User already exists" });
} catch(err){

}
};
export const login = (req, res) => {
    res.send("login page");
}
export const logout = (req, res) => {
    res.send("logout page");
}