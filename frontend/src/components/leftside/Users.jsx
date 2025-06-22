import React from "react";
import Msg from "./Msg";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import useConversation from "../../zustand/useConversation.js";

const Users = React.memo(() => {
  const [allUsers] = useGetAllUsers();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const usersArray = Array.isArray(allUsers) ? allUsers : [];

  const openChat = (user) => {
    setSelectedConversation(user);
    document.querySelector(".left-container")?.classList.remove("active");
    document.querySelector(".right-container")?.classList.remove("dactive");
  };

  return (
    <div>
      <div>
        <h1 className="px-8 py-1 bg-slate-400 rounded-md">MESSAGES</h1>
      </div>
      <div
        className="scrollNone overflow-y-auto chat"
        style={{ maxHeight: "calc(90vh - 10vh)" }}
      >
        {usersArray.map((user) => {
          const isSelected = selectedConversation?._id === user._id;
          return (
            <div
              key={user._id}
              onClick={() => openChat(user)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                isSelected ? "bg-slate-700" : ""
              }`}
            >
              <Msg user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Users;
// This component displays a list of users in a chat application.
// It allows users to select a conversation by clicking on a user's message preview.
// The selected conversation is highlighted, and clicking on a user opens the chat with that user.
// The component uses Zustand for state management and a custom hook to fetch all users.