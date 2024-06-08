import React from "react";

function Container({ children, className }) {
  return (
    <div className={`container mx-auto px-1 ${className}`}>{children}</div>
  );
}

export default Container;
