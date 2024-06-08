import React from "react";

function Button({ children, className, isLoading }) {
  return (
    <button
      disabled={isLoading}
      className={`flex w-full py-2 justify-center rounded bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:text-slate-500 ${
        isLoading && "cursor-wait"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
