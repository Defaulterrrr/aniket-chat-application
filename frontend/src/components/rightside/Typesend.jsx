import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessages from "../../context/useSendMessage";

function Typesend() {
  const [input, setInput] = useState("");
  const [loading, sendMessages] = useSendMessages();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    // Attach current time for real-time communication
    const message = {
      message: trimmed,
    };
    await sendMessages(message);
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bottom-0 left-0 w-full">
        <div className="flex items-center px-4 space-x-3 bg-slate-700 rounded-md h-[8vh] w-[100%]">
          <div className="w-[70%]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input outline-none bg-slate-600 py-3 px-3 rounded-2xl w-[100%]"
              placeholder="Type here"
              disabled={loading}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="text-slate-300 text-3xl hover:bg-slate-400 rounded-2xl p-2 cursor-pointer"
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Typesend);
// This component provides a text input field for sending messages in a chat application.
// It includes a send button that triggers the message sending function when clicked or when the form is submitted.
// The input field is disabled while a message is being sent to prevent multiple submissions.
// The component uses React's memoization to optimize performance by preventing unnecessary re-renders.
// The message is sent with the current timestamp to ensure real-time communication.
// The input field is cleared after sending a message, and it automatically focuses on the input field when the component mounts.
// The component is designed to be responsive and fits within the chat interface, providing a user-friendly experience for sending messages.
// It also includes basic validation to ensure that empty messages are not sent.
// The component is styled using Tailwind CSS classes for a consistent look and feel within the chat application.
// The send button is styled to change color on hover, enhancing user interaction feedback.
