import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Msg = React.memo(function Msg({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  // Ensure both IDs are strings for comparison
  const isOnline = onlineUsers.map(String).includes(String(user._id));
  const isSelected = selectedConversation?._id === user._id;

  return (
    <div
      className={`hover:bg-slate-600 duration-300 rounded-md ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="px-3 py-2 flex gap-6 items-center mt-1 cursor-pointer hover:bg-slate-700 duration-300 rounded-md">
        <div className={`avatar avatar-${isOnline ? "online" : "offline"}`}>
          <div className="w-14">
            <img
              className="rounded-full"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt={user.fullname}
            />
          </div>
        </div>
        <div>
          <h1 className="text-white">{user.fullname}</h1>
          <span className="text-zinc-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
});

export default Msg;
// This component displays a message preview for each user in the chat application.
// It includes the user's avatar, name, and email, and indicates whether the user is online or offline.