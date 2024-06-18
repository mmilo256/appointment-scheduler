import React from "react";
import Container from "./Container";
import { NavLink } from "react-router-dom";

function Tabs({ links }) {
  return (
    <nav className="py-2 my-5 bg-slate-300 flex">
      <Container>
        <ul className="flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${
                    isActive ? link.styles : "text-slate-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

export default Tabs;
