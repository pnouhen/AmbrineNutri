import React from "react";
import { useState } from "react";

import NavItem from "../header/NavItem";

export default function Header() {
  const [open, setOpen] = useState(false);

  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <header className="relative flex gap-4 px-8 py-2.5 bg-white-300">
      <img
        src="/assets/logo/logo.webp"
        alt="Logo de Laura Diététique"
        className="md:h-36 h-16 md:w-20 w-8 object-contain"
      />

      <div className="w-full flex flex-col lg:gap-5">
        <div className="h-full flex flex-col justify-around">

          <h1 className="h1">Laura diététique</h1>

          <p className="md:mr-0 mr-3.5 ls:text-2xl md:text-xl text-sm font-header">
            A l'écoute pour des conseils de qualité et personnalisés
          </p>
        </div>

        <nav
          className={`${
            open === false ? "" : "max-md:h-[100vh] max-md:w-[100vw] max-md:bg-white"
          } max-md:absolute max-md:right-1/2 max-md:left-0 max-md:z-50 max-md:px-8 md:mx-2.5 max-md:w-full  max-md:flex max-md:flex-col max-md:items-end max-md:gap-14`}
        >
          {" "}
          <div className="md:hidden absolute top-0 translate-y-1/2 w-6 flex justify-center">
            <i
              className={`fa-solid ${
                open === true ? "fa-xmark" : "fa-bars "
              } text-2xl cursor-pointer text-end`}
              onClick={() => setOpen(!open)}
            ></i>
          </div>
          <ul
            className={`max-md:absolute left-0 right-0 top-16 max-md:px-5 flex md:justify-end md:gap-2 gap-4 list-none ${
              open === false ? "max-md:hidden" : "w-full flex flex-col"
            }`}
          >
            <NavItem to="" text="Accueil" />

            <NavItem to="qui-suis-je" text=" Qui suis-je ?" />

            <NavItem
              to="consultations-et-tarifs"
              text="Consultations et Tarifs"
            />

            <li className="navLi">
              <a
                className="navItem bg-green-100"
                href="https://user.clicrdv.com/Laura-Gentes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </li>

            <NavItem to="recettes" text="Recettes" />
            
            <NavItem to="se-connecter" text="Se connecter" />
          </ul>
        </nav>
      </div>
    </header>
  );
}
