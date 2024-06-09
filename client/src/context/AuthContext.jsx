import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("jwt") ? localStorage.getItem("jwt") : null; // Obtiene el token del localStorage si existe
  });
  const [user, setUser] = useState(() => {
    return localStorage.getItem("jwt")
      ? jwtDecode(localStorage.getItem("jwt")) // Decodifica el token JWT para obtener la información del usuario
      : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token)); // Actualiza la información del usuario si el token cambia
    }
  }, [token]);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const token = await authService.login(username, password); // Intenta iniciar sesión y obtener un token
      if (token) {
        localStorage.setItem("jwt", token); // Guarda el token en el localStorage
        setToken(token); // Actualiza el estado del token
      }
    } catch (error) {
      console.log("Error al obtener token"); // Muestra un mensaje de error si falla el inicio de sesión
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt"); // Elimina el token del localStorage
    setToken(null); // Resetea el estado del token
    setUser(null); // Resetea el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
