import React, { useEffect } from "react";
import Header from "./Header";
import Typesend from "./Typesend";
import Messages from "./Messages";
import "../../App.css";
import { RiMenu2Fill } from "react-icons/ri";
import NoChatSelected from "./NoChatSelected";
import useConversation from "../../zustand/useConversation";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleMenuClick = () => {
    document.querySelector(".left-container")?.classList.toggle("active");
    document.querySelector(".right-container")?.classList.toggle("dactive");
  };
  return (
    <div className="w-[70%] relative flex flex-col bg-slate-800 text-white max-[600px]:w-[100%] max-[600px]:text-center right-container controloverflow">
      <div
        className={`hidden max-[600px]:block max-[600px]:text-2xl max-[600px]:relative max-[600px]:left-10 max-[600px]:top-10`}
        onClick={handleMenuClick}
      >
        <RiMenu2Fill />
      </div>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="openchat">
          <Header />
          <div
            className="scrollNone overflow-y-auto"
            style={{ minHeight: "calc(92vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Typesend />
        </div>
      )}
    </div>
  );
}

export default Right;
