import { Link } from "react-router-dom";

function HomePannel({ children, className, href, color }) {
  let colorStyles;
  switch (color) {
    case "green":
      colorStyles = "bg-green-500";
      break;
    case "lime":
      colorStyles = "bg-lime-500";
      break;
    case "blue":
      colorStyles = "bg-blue-500";
      break;
    case "orange":
      colorStyles = "bg-orange-500";
      break;
    case "purple":
      colorStyles = "bg-purple-500";
      break;
    default:
      colorStyles = "bg-blue-400";
      break;
  }

  return (
    <Link
      className={`${colorStyles} flex hover:scale-105 transition-transform justify-center items-center rounded text-white font-bold text-3xl ${className}`}
      to={href}
    >
      {children}
    </Link>
  );
}

export default HomePannel;
