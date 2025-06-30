import { Server } from "socket.io";
import http from "http";
import express from "express";

// const authUser = JSON.parse(localStorage.getItem("ChatAppUser")); // Using the Auth context to get user data
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://aniket-chat-application-5.onrender.com", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Store the userId and socket.id in the users object
const users = {};

//realtime communication using socket.io
// This object will store userId as keys and socket.id as values

export const getReceiverSocketId = (receiverId) => {
  // Function to get the socket ID of a receiver based on their userId
  console.log("Receiver in serverjs ID:", receiverId);
  return users[receiverId]; // Return the socket.id for the given userId
};

//used to listen for incoming connections
io.on("connection", (socket) => {
  console.log("connected User socketID:", socket.id);
  const userId = socket.handshake.query.userId; // Get userId from the query parameters
  // userID main socket id se map hota hai ye exact id hai jo mongo main save hoti hai
    if (userId) {
    if (!users[userId]) {
      users[userId] = [];
    }
    users[userId].push(socket.id);
    console.log("Connected User ID:", users);
  }

  io.emit("getOnlineUsers", Object.keys(users)); // Emit the online users to all connected clients
  // Handle disconnection
  // used to listen client side events emitted by the client
  socket.on("disconnect", () => {
    console.log("User disconnect socketID", socket.id);
    if (userId && users[userId]) {
      users[userId] = users[userId].filter(id => id !== socket.id);
      if (users[userId].length === 0) {
        delete users[userId];
      }
    }
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { io, server, app };
