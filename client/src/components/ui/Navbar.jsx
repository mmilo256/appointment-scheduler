import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { AuthContext } from "../../context/AuthContext";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Audiencias", href: "appointments" },
  { label: "Ciudadanos", href: "citizens" },
  { label: "Direcciones", href: "departments" },
  { label: "Usuarios", href: "users" },
];

function Navbar() {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="bg-primary-500 text-white">
      <Container className="flex justify-between items-center">
        <ul className="flex h-14">
          {navigation.map((item) => (
            <li key={item.label}>
              <NavLink
                className="hover:bg-secondary-500 transition-colors px-2 block h-full content-center"
                to={item.href}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <p className="font-light italic">{user.username}</p>
          <button className="font-semibold" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
