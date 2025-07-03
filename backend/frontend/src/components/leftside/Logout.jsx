import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";

const Logout = React.memo(() => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        toast.success("User logged out successfully");
        localStorage.removeItem("ChatAppUser");
        Cookies.remove("jwt");
        window.location.reload();
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Error during logout: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-600 h-[8vh] w-[30%] text-3xl px-4 text-slate-300 flex items-center justify-between gap-5 rounded-md fixed bottom-0 max-[600px]:w-[100%]">
      <h2 className="text-sm">User Logout</h2>
      <button
        className="flex items-center"
        onClick={handleLogout}
        disabled={loading}
        style={{ background: "none", border: "none", padding: 0, margin: 0 }}
        aria-label="Logout"
      >
        <BiLogOutCircle
          className={`hover:bg-slate-400 rounded-3xl cursor-pointer ${
            loading ? "opacity-50" : ""
          }`}
        />
        {loading && (
          <span className="ml-2 text-xs text-slate-200">Logging out...</span>
        )}
      </button>
    </div>
  );
});

export default Logout;
