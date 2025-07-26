import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ to, text }) {
  return (
    <li className="navLi">
      <NavLink
        to={`/${to}`}
        className={({ isActive }) =>
          `navItem ${isActive ? "bg-mustard" : "bg-green-100"}`
        }
      >
        {" "}
        {text}
      </NavLink>
    </li>
  );
}
