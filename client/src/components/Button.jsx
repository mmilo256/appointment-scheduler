import React from "react";

function Button({ children, className }) {
  return (
    <button
      className={`flex w-full py-2 justify-center rounded bg-orange-500 hover:bg-orange-600 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
