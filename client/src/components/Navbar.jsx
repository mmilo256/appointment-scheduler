import React from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Audiencias", href: "appointments" },
  { label: "Ciudadanos", href: "citizens" },
  { label: "Direcciones", href: "departments" },
  { label: "Empleados", href: "users" },
];

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <Container className="flex justify-between items-center">
        <ul className="flex h-14">
          {navigation.map((item) => (
            <li key={item.label}>
              <NavLink
                className="hover:bg-red-700 px-4 block h-full content-center"
                to={item.href}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <p>Usuario</p>
          <div className="h-10 w-10 rounded-full bg-blue-400"></div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
