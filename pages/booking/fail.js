import React from "react";

const Fail = () => {
  if (typeof window !== "undefined") {
    window.location.href = `${window.location.origin}/booking?fail=1`;
  }
  return <div />;
};

export default Fail;
