import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";

const useGetMessages = () => {
  const { selectedConversation } = useConversation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!selectedConversation || !selectedConversation._id) {
      setMessages([]);
      return;
    }

    setLoading(true);
    fetch(`/api/message/get/${selectedConversation._id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!ignore) setMessages(data.messages || []);
      })
      .catch(() => {
        if (!ignore) setMessages([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [selectedConversation]);

  return { loading, messages, setMessages, selectedConversation };
};

export default useGetMessages;
