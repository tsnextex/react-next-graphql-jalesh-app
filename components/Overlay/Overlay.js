import React, { useEffect } from "react";

export const Overlay = ({ children }) => {
  useEffect(() => {
    if (typeof document !== "undefined")
      document.body.style.overflow = "hidden";
    return () => {
      if (typeof document !== "undefined")
        document.body.style.overflow = "auto";
    };
  });
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 overflow-y-scroll bg-j-white">
      {children}
    </div>
  );
};

export default Overlay;
