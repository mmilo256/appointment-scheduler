import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

  const token = localStorage.getItem("jwt")

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />
  }

}

export default PrivateRoute;
