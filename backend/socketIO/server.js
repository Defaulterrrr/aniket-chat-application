import { Server } from "socket.io";
import http from "http";
import express from "express";

// const authUser = JSON.parse(localStorage.getItem("ChatAppUser")); // Using the Auth context to get user data
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      // "https://aniket-chat-application-6.onrender.com", // Replace with your frontend URL
      "http://localhost:3001", // Replace with your frontend URL
    ],
    methods: ["GET", "POST"],
  },
});


//realtime communication using socket.io
// This object will store userId as keys and socket.id as values
export const getReceiverSocketId = (receiverId) => {
  // Function to get the socket ID of a receiver based on their userId
  console.log("Receiver in serverjs ID:", receiverId);
  return users[receiverId]; // Return the socket.id for the given userId
};


// Store the userId and socket.id in the users object
const users = {};

//used to listen for incoming connections
io.on("connection", (socket) => {
  console.log("New Connection", socket.id);
  const userId = socket.handshake.query.userId; // Get userId from the query parameters
  // userID main socket id se map hota hai ye exact id hai jo mongo main save hoti hai
  if (userId) {
    users[userId]=socket.id; // Store the socket.id for the userId
    // users[userId].push(socket.id); // Add the socket.id to the array for the
    console.log("hello:", users);
  }

  // Emit the online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(users)); // Emit the online users to all connected clients
  // Handle disconnection
  // used to listen client side events emitted by the client
  socket.on("disconnect", () => {
    console.log("User disconnect socketID", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
