import React, { useContext } from "react";
import LoginForm from "../components/Login/LoginForm";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-primary-500 h-dvh flex items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default Login;
