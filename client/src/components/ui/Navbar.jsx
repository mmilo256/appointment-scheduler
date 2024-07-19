import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { AuthContext } from "../../context/AuthContext";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Crear audiencia", href: "appointments/create" },
  { label: "Audiencias", href: "appointments" },
  { label: "Ciudadanos", href: "citizens" },
  { label: "Derivaciones", href: "referrals/pending" },
  { label: "Usuarios", href: "users" },
];

function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(false)

  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <nav className="bg-primary-500 text-white">
      <Container className="flex justify-between items-center">
        <ul className="hidden md:flex h-14">
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
        <div className="hidden md:flex items-center gap-4">
          <p className="font-light italic">{user.username}</p>
          <button
            className="bg-secondary-500 hover:bg-secondary-600  px-2 py-1 rounded font-semibold"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
        <p className="md:hidden font-light italic">{user.username}</p>
        <button onClick={onToggleMenu} className="h-12 w-14 my-2 rounded bg-secondary-500 block md:hidden ml-auto">Menú</button>
      </Container>
      {/**Menu para pantallas móviles */}
      {toggleMenu && <ul className="z-10 block md:hidden absolute bg-primary-500 left-0 right-0">
          {navigation.map(item => (
            <li key={item.label}>
              <NavLink onClick={onToggleMenu} className="block hover:bg-secondary-500 py-4 text-xl" to={item.href}>{item.label}</NavLink>
            </li>
          ))}
          <button
            className="bg-secondary-500 hover:bg-secondary-600 my-4 px-2 py-1 rounded font-semibold"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </ul>}
    </nav>
  );
}

export default Navbar;
