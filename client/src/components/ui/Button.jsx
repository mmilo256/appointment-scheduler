import React from "react";
import { Link } from "react-router-dom";

function Button({ children, onClick, className, href, type, color, disabled }) {
  let colorStyles;

  switch (color) {
    case "secondary":
      colorStyles =
        "bg-secondary-500 bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-200";
      break;
    default:
      colorStyles =
        "bg-primary-500 bg-primary-500 hover:bg-primary-400 disabled:bg-primary-300";
      break;
  }

  if (href) {
    return (
      <Link
        to={href}
        onClick={onClick}
        className={`${colorStyles} flex w-full py-1 px-2 justify-center rounded text-white    ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={` ${colorStyles} flex w-full py-1 px-2 justify-center rounded text-white   ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}

export default Button;
