import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import { useSocketContext } from "./SocketContext.jsx";
import sound from "../assets/bellnotification.mp3"; // Import the notification sound
// This hook is used to get the socket message and update the conversation state
const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const {messages, setMessages } = useConversation();
  useEffect(() => {
    if (!socket) return; // Ensure socket is available before setting up the listener
    // Listen for new messages from the socke

    socket.on("newMessage", (newMessage) => {
      const notificationSound = new Audio(sound);
      notificationSound.play(); // Play the notification sound when a new message is received
      setMessages((prev)=> [...prev, newMessage]); // Update the messages state with the new message
    }); // Set up the event listener for new messages
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("newMessage"); // Clean up the event listener when the component unmounts
    };
  }, [socket, messages, setMessages]);
};

export default useGetSocketMessage;
