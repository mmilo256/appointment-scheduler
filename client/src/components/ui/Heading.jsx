import React from "react";

function Heading({ children, className }) {
  return (
    <h1 className={`text-4xl my-10 font-semibold ${className}`}>{children}</h1>
  );
}

export default Heading;
