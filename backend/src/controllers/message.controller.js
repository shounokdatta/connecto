import User from "../modules/user_model.js";
import cloudinary from "cloudinary";
import Message from "../modules/message_model.js";
import { ioServer, getReceiverSocketId } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        
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

    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;

        if (image) {
            console.log("Received image for upload:", image.slice(0, 30)); // log first 30 chars

            const uploadedImage = await cloudinary.uploader.upload(image, {
            });

            imageUrl = uploadedImage.secure_url;
            console.log("Image uploaded to Cloudinary:", imageUrl);
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverScoketId=getReceiverSocketId(receiverId);
        if(receiverScoketId){
            ioServer.to(receiverScoketId).emit("newMessage",newMessage);

        }

        res.status(200).json(newMessage);

    } catch (err) {
        console.log("ERROR in sendMessage:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

