import React, { useEffect } from "react";
import LoginForm from "../components/Login/LoginForm";
import bg from '../assets/images/chonchi.jpg'

function Login() {

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt")
    }
  }, [])

  return (
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "top" }} className="h-dvh flex items-center justify-center">
      <div className='absolute inset-0 bg-primary-500/50 flex items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
