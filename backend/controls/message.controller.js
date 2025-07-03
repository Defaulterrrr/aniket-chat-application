import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling
import Conversation from "../models/coversation.model.js"; // Import the Conversation model
import Message from "../models/message.model.js"; // Import the Message model
import { getReceiverSocketId, io } from "../socketIO/server.js";
// Function to send a message
export const sendMessage = async (req, res) => {
  // console.log("sendMessage called", req.params.id, req.body.message)
  try {
    const { message } = req.body; // Destructure message from req.body
    const senderId = new mongoose.Types.ObjectId(req.user._id); // current logged in user
    const receiverId  = new mongoose.Types.ObjectId(req.params.id); // Get the receiverId from the request parameters
    console.log("senderId", senderId, "receiverId", receiverId);
    // Check if the senderId and receiverId are the same
    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ error: "Sender and receiver cannot be the same." }); // Return an error response if they are the same
    }
    // Check if the conversation already exists between sender and receiver

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }, // Find the conversation where both sender and receiver are members
    });
    console.log("conversation", conversation);

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId], // Create a new conversation if it doesn't exist
      });
      res.status(200).json({ message: "Conversation created", conversation }); // Send a response indicating that the conversation was created
    }

    // Add the message to the conversation

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      await conversation.updateOne({ $push: { messages: newMessage._id } }); // Push the new message ID into the conversation's messages array
    }

    try {
      await Promise.all([
        newMessage.save(), // Save the new message to the database
        conversation.save(), // Save the updated conversation to the database
      ]);

      // Emit the new message to the receiver's socket
      // Assuming you have a socket.io instance available, you can emit the message here
      const receiverSocketId = getReceiverSocketId(receiverId); // Get the socket ID of the receiver
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res
        .status(200)
        .json({ message: "Message sent successfully", newMessage }); // Send a response indicating that the message was sent
    } catch (error) {
      console.error("Error saving message or conversation:", error); // Log any errors that occur during saving
      res.status(500).json({ error: "Internal server error" }); // Send a 500 Internal Server Error response
    }
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// export default sendMessage;

export const getMessage = async (req, res) => {
  try {
    const chatUser = new mongoose.Types.ObjectId(req.params.id); // Get the receiverId from the request parameters
    const senderId = new mongoose.Types.ObjectId(req.user._id); // Get the senderId from the request object (assuming req.user is populated with user data)
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages"); // Find the conversation where both sender and receiver are members and populate the messages field
    console.log("conversation", conversation);

    if (!conversation) {
      return res.status(201).json({ message: "No conversation found" });
    }

    const messages = await Message.find({
      _id: { $in: conversation.messages },
    }).sort({ createdAt: -1 }); // Sort messages by createdAt in descending order
    return res.status(201).json({ messages });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export default sendMessage; // Export the sendMessage function for use in other modules
