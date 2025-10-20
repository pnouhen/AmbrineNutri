import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

import NavItem from "../header/NavItem";
import { toggleOverflow } from "../services/toggleOverflow";

export default function Header() {
  const [menuBurger, setMenuBurger] = useState(false);
  const [compteActive, setCompteActive] = useState(false);

  // Recover token, userInfo and logout put into context
  const { token, userInfo, logout } = useContext(AuthContext);

  // Change account Navlink background color
  const location = useLocation();
  const usepageActive =
    location.pathname === "/panier" ||
    location.pathname === "/mon-compte" ||
    location.pathname === "/mes-recettes";

  // Display account menu
  const onClickCompte = () => {
    setCompteActive(!compteActive);
  };
  const onMouseEnterCompte = () => {
    setCompteActive(true);
  };
  const onMouseLeaveCompte = () => {
    setCompteActive(false);
  };
  const enterCompte = (e) => {
    if (e.key === "Enter" || e.key === "Tab") setCompteActive(true);
    if (e.key === "Escape") setCompteActive(false);
  };
  const escapeCompte = (e) => {
    if (e.key === "Escape" || e.key === "Tab") {
      e.stopPropagation();
      setCompteActive(false);
    }
  };

  // Stop overflow in tablet and mobile
  useEffect(() => {
    toggleOverflow(menuBurger);
  }, [menuBurger]);

  const handleLogout = () => {
    logout();
  };

  // Rendering depending on the connection
  const renderAuthElements = () => {
    if (token) {
      return (
        <li
          tabIndex={0}
          className={`navItem relative lg:w-[8.75rem] transition-all duration-100 ${
            usepageActive ? "bg-mustard" : "bg-green-100"
          } ${compteActive ? "rounded-t-[1.25rem]" : "navItem-rounded"}`}
          onClick={onClickCompte}
          onMouseEnter={onMouseEnterCompte}
          onMouseLeave={onMouseLeaveCompte}
          onKeyDown={(e) => enterCompte(e)}
        >
          <div className="navItem-padding relative w-full z-10 cursor-pointer">
            <p className="max-md:mx-auto text-center lg:truncate lg:w-20">
              {userInfo?.firstName}
            </p>
            <i
              className={`fa-solid fa-chevron-down absolute top-1/2 -translate-y-1/2 right-5 ${
                compteActive ? "rotate-180 mt-1" : "rotate-360"
              }`}
            ></i>
          </div>

          <ul
            className={`absolute ${
              userInfo?.role === "user"
                ? "lg:-bottom-[11rem] md:-bottom-[7rem] -bottom-[9rem]"
                : "lg:-bottom-[2.75rem] md:-bottom-[1.75rem] -bottom-[2.25rem]"
            } w-full transition-all duration-200 ${
              compteActive ? "z-10" : "-z-10 opacity-0 pointer-events-none"
            }`}
          >
            {userInfo?.role === "user" ? (
              <>
                <NavItem
                  to="mon-compte"
                  className="navItem-padding"
                  text="Mon Compte"
                />

                <NavItem
                  to="mes-recettes"
                  className="navItem-padding"
                  text="Mes Recettes"
                />

                <NavItem
                  to="panier"
                  className="navItem-padding"
                  text="Panier"
                />
              </>
            ) : (
              <></>
            )}

            <li>
              <button
                className="navItem navLi navItem-padding w-full rounded-b-[1.25rem] bg-green-100 cursor-pointer"
                onClick={handleLogout}
                onKeyDown={(e) => escapeCompte(e)}
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </li>
      );
    }

    return (
      <NavItem
        to="se-connecter"
        className="navItem-padding navItem-rounded"
        text="Se connecter"
      />
    );
  };

  return (
    <header className="relative flex gap-4 px-8 py-5 bg-white-300-100">
      <img
        src="/assets/logo/logo.webp"
        alt="Logo de Ambrine Nouhen"
        className="md:h-36 h-16 md:w-20 w-8 object-contain"
      />

      <div className="w-full flex flex-col lg:gap-5">
        <div className="h-full flex flex-col justify-around">
          <h1 className="h1">Ambrine Nutri</h1>

          <p className="md:mr-0 mr-3.5 ls:text-2xl md:text-xl text-sm font-header">
            A l'écoute pour des conseils de qualité et personnalisés
          </p>
        </div>

        <nav
          className={`${
            menuBurger === false
              ? ""
              : "max-lg:h-[100vh] max-lg:w-[100vw] max-lg:bg-white"
          } max-lg:absolute max-lg:right-1/2 max-lg:left-0 max-lg:z-50 max-lg:px-8 max-lg:w-full  max-lg:flex max-lg:flex-col max-lg:items-end max-lg:gap-14`}
        >
          {/* Responvie display  */}
          {window.innerWidth <= 1024 ? (
            <div className="absolute md:right-8 right-4 top-0 translate-y-1/2 w-6 flex justify-center">
              <i
                className={`fa-solid ${
                  menuBurger === true ? "fa-xmark" : "fa-bars "
                } text-2xl cursor-pointer text-end`}
                onClick={() => setMenuBurger(!menuBurger)}
              ></i>
            </div>
          ) : (
            ""
          )}

          <ul
            className={`max-lg:absolute z-50 left-0 right-0 top-16 max-lg:px-5 flex md:justify-end md:gap-1 gap-4 list-none ${
              menuBurger === false ? "max-lg:hidden" : "w-full flex flex-col"
            }`}
          >
            <NavItem
              to=""
              className="navItem-padding navItem-rounded"
              text="Accueil"
            />

            <NavItem
              to="qui-suis-je"
              className="navItem-padding navItem-rounded"
              text=" Qui suis-je ?"
            />

            <NavItem
              to="consultations-et-tarifs"
              className="navItem-padding navItem-rounded"
              text="Consultations et Tarifs"
            />

            <li className="navLi">
              <a
                className="navItem navItem-padding navItem-rounded bg-green-100"
                href="https://user.clicrdv.com/Ambrine-Nouhen"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </li>

            <NavItem
              to="recettes"
              className="navItem-padding navItem-rounded"
              text="Recettes"
            />

            {renderAuthElements()}
          </ul>
        </nav>
      </div>
    </header>
  );
}
