import React from "react";

function Heading({ children, className }) {
  return (
    <h1 className={`text-2xl my-5 font-semibold ${className}`}>{children}</h1>
  );
}

export default Heading;
