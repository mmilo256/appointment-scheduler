import React from "react";

function Container({ children, className }) {
  return (
    <div className={`w-[90%] max-w-[80rem] mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default Container;
