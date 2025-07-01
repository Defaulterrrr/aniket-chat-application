import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "./authProvider.jsx";
// This file creates a context for managing socket connections and online users
import { io } from "socket.io-client";

// Create context ONCE, outside the hook
const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [authUser] = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    let socketInstance;
    if (authUser) {
      socketInstance = io("https://aniket-chat-application-6.onrender.com", {
        query: {
          userId: authUser.user._id,
        },
        transports: ["websocket"], // Fastest transport, avoids polling
      });
      setSocket(socketInstance);
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      // return () =>{
        // socketInstance.disconnect();
        // setSocket(null);
      // }
    } else {
      // Clean up if user log out
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  },);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
