import React from "react";

const Loading = React.memo(() => (
  <div className="flex items-center justify-center h-full">
    <div
      className="flex w-full justify-center flex-col gap-4"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      <div className="skeleton h-32 w-full bg-slate-500"></div>
      <div className="skeleton h-4 w-28 bg-slate-500"></div>
      <div className="skeleton h-4 w-full bg-slate-500"></div>
      <div className="skeleton h-4 w-full bg-slate-500"></div>
    </div>
  </div>
));

export default Loading;
// This component is a simple loading indicator that can be used while data is being fetched.
// It displays a skeleton loader with a flexible height and width, making it adaptable to different screen sizes.