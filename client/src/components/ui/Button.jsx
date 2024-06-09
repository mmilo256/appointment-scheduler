import React from "react";
import { Link } from "react-router-dom";

function Button({ children, className, isLoading, href, type }) {
  if (href) {
    return (
      <Link
        disabled={isLoading}
        to={href}
        className={`flex w-full py-2 justify-center rounded text-white bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-300 disabled:text-slate-500 ${
          isLoading && "cursor-wait"
        } ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={isLoading}
      type={type === "submit" ? "submit" : "button"}
      className={`flex w-full py-2 justify-center rounded text-white bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-300 disabled:text-slate-500 ${
        isLoading && "cursor-wait"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
