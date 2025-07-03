import { useState } from "react";
import useConversation from "../zustand/useConversation.js";

const useSendMessage = () => {
  const { selectedConversation, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  const sendMessages = async (message) => {
    if (!selectedConversation || !selectedConversation._id) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/message/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:message.message,
            createdAt: new Date().toISOString(), // Attach current time for real-time communication
            }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Use functional update for fastest, safest state update
        setMessages((prev) => [...prev, data]);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return [loading, sendMessages];
};

export default useSendMessage;
// This custom hook provides a function to send messages in the current conversation.
// It uses Zustand for state management and handles loading state during the message sending process.
