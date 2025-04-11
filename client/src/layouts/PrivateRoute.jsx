import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkToken } from "../utils/helpers";

function PrivateRoute() {

  const token = localStorage.getItem("jwt")
  const isValidToken = checkToken(token)

  if (isValidToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />
  }

}

export default PrivateRoute;
