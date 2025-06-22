const NoChatSelected = () => {
  const authUser = JSON.parse(localStorage.getItem("ChatAppUser"));
  console.log("authnochat", authUser);
  return (
    <div className="flex flex-col items-center justify-center h-[92vh] gap-5 nochatselected">
      <img
        className="w-24 h-24 rounded-full"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        alt="User Avatar"
      />
      <h1 className="text-slate-300">
        Welcome <span>{authUser.user.fullname}</span>
      </h1>
      <br />
      <h3 className="text-slate-400">
        No chat selected, please select anyone to yourr contact for start
        conversation
      </h3>
    </div>
  );
};

export default NoChatSelected;
