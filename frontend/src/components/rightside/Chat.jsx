import React from "react";

function Chat({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatAppUser")) || null;
  const itsMe = authUser?.user?._id === message.senderId;

  const chatSide = itsMe ? "chat-end" : "chat-start";
  const chatBubbleColor = itsMe
    ? "bg-blue-500 text-white"
    : "bg-slate-400 text-black";
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className={`chat ${chatSide}`}>
        <div className={`chat-bubble ${chatBubbleColor}`}>
          {message.message}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    </div>
  );
}

export default React.memo(Chat);
// This component displays a chat message with the sender's information and the time it was sent.
// It uses conditional rendering to style the message differently based on whether the current user is the sender or not.
// The message is displayed in a chat bubble format, with the time formatted to a 24-hour clock.
// The component is memoized to optimize performance, preventing unnecessary re-renders when the props do not change.