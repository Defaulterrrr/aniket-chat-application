import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import { useSocketContext } from "./SocketContext.jsx";
import sound from "../assets/bellnotification.mp3"; // Import the notification sound
// This hook is used to get the socket message and update the conversation state
const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();
  useEffect(() => {
    if (!socket) return; // Ensure socket is available before setting up the listener
    // Listen for new messages from the socket

    const handleNewMessage = (newMessage) => {
      const notificationSound = new Audio(sound);
      notificationSound.play(); // Play the notification sound when a new message is received
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage); // Set up the event listener for new messages
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("newMessage", handleNewMessage); // Clean up the event listener when the component unmounts
    };
  }, [socket, setMessages]);
};

export default useGetSocketMessage;
