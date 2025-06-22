import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import "../../App.css";
function Left() {
  return (
    <div className="w-[30%] bg-slate-800 left-container max-[600px]:w-[100%] max-[600px]:hidden">
      <Search />
      <div
        className="scrollNone overflow-y-auto"
        style={{ minHeight: "calc(90vh - 10vh)" }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;
