import React, { useMemo } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { MdArrowBackIos } from "react-icons/md";
function header() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const user = useMemo(
    ()=> selectedConversation?.fullname|| "User not found",[selectedConversation]
  );

  // Function to get the online status of a user based on their ID
  const userId= selectedConversation?._id;

  const isOnline= useMemo(
    ()=>userId&& onlineUsers.includes(userId),
    [userId,onlineUsers]
   );
  return (
    <div className="flex items-center justify-center h-[8vh] gap-3 py-4 bg-slate-700 max-[600px]:mt-[-27px] relative">
      <div
        className="hidden max-[600px]:block max-[600px]:absolute max-[600px]:left-4 max-[600px]:top-6 max-[600px]:text-2xl cursor-pointer"
        onClick={() => {
          document.querySelector(".left-container").classList.toggle("active");
          document.querySelector(".right-container").classList.toggle("dactive");
        }}
      >
        <MdArrowBackIos />
      </div>
      <div
        className={`avatar ${isOnline? "avatar-online" : "avatar-offline"} flex items-center justify-center`}
      >
        <div className="w-12">
          <img
            className="rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div>
        <h1 className="text-white">{user}</h1>
        <h3 className="text-slate-300">
          {isOnline ? "Online": "Offline"}
        </h3>
      </div>
    </div>
  );
}

export default header;
