import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const { user, token } = useContext(AuthContext);
  if (!user || !token) return <Navigate to="/login" />;
  return <Outlet />;
}

export default PrivateRoute;
