import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function Providers({ children }) {
  return (
    <AuthProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthProvider>
  );
}

export default Providers;