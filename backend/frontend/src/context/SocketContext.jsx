import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "./authProvider.jsx";
// This file creates a context for managing socket connections and online users
import { io } from "socket.io-client";

// Create context ONCE, outside the hook
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [authUser] = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // let socketInstance;
    if (authUser) {
      const socket = io("https://ma-chatapp.onrender.com", {
        // http://localhost:4002
        query: {
          userId: authUser.user._id,
        },
        transports: ["websocket"], // Fastest transport, avoids polling
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      // return () => socket.close(); // Clean up on unmount
    } else {
      // Clean up if user log out
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
