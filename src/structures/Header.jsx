import React from "react";
import { useState } from "react";
import NavItem from "../header/NavItem";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex gap-4 px-8 py-2.5 bg-white-80">
      <img
        src="/assets/logo/logo.webp"
        alt="Logo de Laura Diététique"
        className="h-36 w-20 object-contain"
      />

      <div className="w-full flex flex-col gap-5">
        <div className="h-full flex flex-col justify-around">

          <h1 className="h1">Laura diététique</h1>

          <p className="md:mr-0 mr-3.5 ls:text-2xl md:text-xl text-sm font-header">
            A l'écoute pour des conseils de qualité et personnalisés
          </p>
        </div>

        <nav
          className={`${
            open === false ? "" : "max-md:h-[100vh] max-md:bg-white"
          } max-md:absolute max-md:right-0 max-md:left-0 max-md:px-8 md:mx-2.5 max-md:w-full  max-md:flex max-md:flex-col max-md:items-end max-md:gap-14`}
        >
          {" "}
          <div className="md:hidden w-6 flex justify-center top-6 right-5 ">
            <i
              className={`fa-solid ${
                open === true ? "fa-xmark" : "fa-bars "
              } text-2xl cursor-pointer text-end`}
              onClick={() => setOpen(!open)}
            ></i>
          </div>
          <ul
            className={`flex md:justify-end gap-3 list-none ${
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
                className="navItem bg-green"
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
