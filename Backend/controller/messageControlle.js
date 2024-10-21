import Conversation from "../models/convarsationmodel.js";
import Message from "../models/messagemodel.js";
import { getReceiverSocketId,io } from "../SocketIo/server.js";

export const sendMessage = async (req, res) => {
   // console.log("message send", req.body.message , req.params.id) ;

    try {
        const {message} =  req.body;
        const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
      await Promise.all([conversation.save(), newMessage.save()]); 
      res.status(201).json(newMessage);
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }catch(error){
        console.log("Error in sendMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getMessage = async (req, res) => {
    try {
      const { id: chatUser } = req.params;
      const senderId = req.user._id; // current logged in user
      let conversation = await Conversation.findOne({
        members: { $all: [senderId, chatUser] },
      }).populate("messages");
      if (!conversation) {
        return res.status(201).json([]);
      }
      const messages = conversation.messages;
      res.status(201).json(messages);
    } catch (error) {
      console.log("Error in getMessage", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };