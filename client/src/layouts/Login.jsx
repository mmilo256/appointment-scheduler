import React, { useEffect } from "react";
import LoginForm from "../components/Login/LoginForm";

function Login() {

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt")
    }
  }, [])

  return (
    <div className="bg-primary-500 h-dvh flex items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default Login;
