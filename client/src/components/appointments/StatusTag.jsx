import React from "react";

function StatusTag({ status }) {
  let tagColor;
  switch (status) {
    case "pendiente":
      tagColor = "bg-yellow-200";
      break;
    case "finalizada":
      tagColor = "bg-green-200";
      break;
    case "cancelada":
      tagColor = "bg-red-200";
      break;
    default:
      tagColor = "bg-gray-200";
      break;
  }

  return (
    <span className={`inline-block py-1 px-4 rounded-full ${tagColor}`}>
      {status}
    </span>
  );
}

export default StatusTag;
