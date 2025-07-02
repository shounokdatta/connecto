import User from "../models/user.model.js";

import Message from "../models/message.model.js";

export const getUsersForSidebar= async(req, res) => {
    try {
        const loggedInUserId = req.getUsersForSidebarser._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
}catch (err) {
    console.log("ERROR in getUsersForSidebar controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });

}
};

export const getMessages = async (req, res) => {
    try{
        const{id:userToChatId }=req.params;
        const myId=req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId:myId, receiverId:userToChatId, },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    }

catch(err){
    console.log("ERROR in getMessages controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
}

}
export const sendMessage = async (req, res) => {
    try{
        const{text,image}=req.body;
        const { id: userToChatId } = req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImage.secure_url;
        }
        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();
        res.status(200).json(newMessage);
    }catch(err){
        console.log("ERROR in sendMessage controller:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
