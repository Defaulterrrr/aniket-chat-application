import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/UseGetAllUsers";
import useConversation from "../../zustand/useConversation";

const Search = React.memo(() => {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!search.trim()) return;
      const user = allUsers.find((u) =>
        u.fullname.toLowerCase().includes(search.toLowerCase())
      );
      if (user) {
        setSelectedConversation(user);
        setSearch("");
      } else {
        toast.error("User not found");
        setSearch("");
      }
    },
    [search, allUsers, setSelectedConversation]
  );

  return (
    <div className="h-[8vh] sticky top-0 rounded-2xl w-[100%] bg-slate-800">
      <form onSubmit={handleSubmit}>
        <div className="p-3 flex gap-5 items-center">
          <label className="input w-[70%] bg-slate-700 rounded-2xl outline-none">
            <input
              type="search"
              placeholder="Search"
              className="w-[100%] px-3 p-1 rounded-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </label>
          <button
            type="submit"
            className="text-white text-xl"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
});

export default Search;
